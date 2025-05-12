import { Component, inject, Input, OnInit } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { TasksService } from '../tasks/tasks.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ProjectsService } from '../projects/projects.service';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

export interface Project {
  _id: string;
  name: string;
  description: string;
  user: string;
  colaborators: string[];
  personal: boolean;
  __v: number;
}

@Component({
  selector: 'app-statuses',
  imports: [
    TasksComponent,
    CommonModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    DragDropModule,
  ],
  templateUrl: './statuses.component.html',
  styleUrl: './statuses.component.css',
})
export class StatusesComponent implements OnInit {
  @Input() tasks_toDo: any[] = [];
  @Input() tasks_inProcess: any[] = [];
  @Input() tasks_underReview: any[] = [];
  @Input() tasks_finished: any[] = [];

  private get tasksMap(): Record<string, any[]> {
    return {
      toDo: this.tasks_toDo,
      inProcess: this.tasks_inProcess,
      underReview: this.tasks_underReview,
      finished: this.tasks_finished,
    };
  }

  private statusMap = {
    toDo: '67e67c1b2d4890a08460641b',
    inProcess: '67e67c222d4890a08460641d',
    underReview: '67e67c2a2d4890a08460641f',
    finished: '67e67c2f2d4890a084606421',
  };

  filtered_toDo: any[] = [];
  filtered_inProcess: any[] = [];
  filtered_underReview: any[] = [];
  filtered_finished: any[] = [];

  allUsers: any[] = [];
  selectedOwnerId: { _id: string; username?: string } | null = null;

  allLabels: any[] = [];
  selectedLabelId: string | null = null;

  private readonly tasksService = inject(TasksService);
  private readonly projectsService = inject(ProjectsService);

  ngOnInit(): void {
    const projectId = localStorage.getItem('selected_project_id');
    
    forkJoin({
      toDo: this.tasksService.getToDoTasks(),
      inProcess: this.tasksService.getInProcessTasks(),
      underReview: this.tasksService.getUnderRevisionTasks(),
      finished: this.tasksService.getFinishedTasks(),
      projects: this.projectsService.getProjectUsers(),
    }).subscribe(({ toDo, inProcess, underReview, finished, projects }) => {
    this.tasks_toDo       = toDo.filter(t => t.project === projectId);
    this.tasks_inProcess  = inProcess.filter(t => t.project === projectId);
    this.tasks_underReview= underReview.filter(t => t.project=== projectId);
    this.tasks_finished   = finished.filter(t => t.project=== projectId);

      this.allUsers = this.extractUsersFromProjects([projects]);
      this.filterTasks();
      this.allLabels = this.extractLabels([
        ...toDo,
        ...inProcess,
        ...underReview,
        ...finished,
      ]);
      console.log('Tareas cargadas:', {
        toDo,
        inProcess,
        underReview,
        finished,
        users: this.allUsers,
      });
    });
  }

  extractLabels(tasks: any[]): any[] {
    const labelsMap = new Map();
    tasks.forEach((task) => {
      if (task.labels) {
        task.labels.forEach((label: any) => {
          labelsMap.set(label._id, label);
        });
      }
    });
    return Array.from(labelsMap.values()); // Devuelve un array de labels únicos
  }

  filterTasks(): void {
    this.filtered_toDo = this.filterTasksByFilters(this.tasks_toDo);
    this.filtered_inProcess = this.filterTasksByFilters(this.tasks_inProcess);
    this.filtered_underReview = this.filterTasksByFilters(
      this.tasks_underReview
    );
    this.filtered_finished = this.filterTasksByFilters(this.tasks_finished);
  }

  filterTasksByFilters(tasks: any[]): any[] {
    return tasks.filter((task) => {
      // Filtrado por usuario
      const userMatches =
        !this.selectedOwnerId || task.user?._id === this.selectedOwnerId._id;

      // Filtrado por etiqueta
      const labelMatches =
        !this.selectedLabelId ||
        task.labels?.some((label: any) => label._id === this.selectedLabelId);

      return userMatches && labelMatches;
    });
  }

  filterTasksByOwner(tasks: any[]): any[] {
    console.log('Filtrando tareas. selectedOwnerId:', this.selectedOwnerId);
    console.log('Tareas antes de filtrar:', tasks);

    if (
      !this.selectedOwnerId ||
      typeof this.selectedOwnerId !== 'object' ||
      !this.selectedOwnerId._id
    ) {
      console.log('No hay filtro activo, devolviendo todas las tareas.');
      return tasks;
    }

    const filteredTasks = tasks.filter(
      (task) => task.user?._id === this.selectedOwnerId!._id
    );

    console.log('Tareas después de filtrar:', filteredTasks);
    return filteredTasks;
  }

  addTask(task: any) {
    console.log('Añadiendo tarea:', task);
    this.tasks_toDo.push(task);
    this.filterTasks(); // si sigues usando filtered_toDo en el template
  }

  extractUsersFromProjects(projects: any[]): any[] {
    const users: any[] = [];
    const userIds: Set<string> = new Set();

    projects.forEach((project) => {
      if (project.user && !userIds.has(project.user)) {
        users.push({ _id: { id: project.user } }); // Crea un objeto de usuario con solo el ID
        userIds.add(project.user);
      }

      if (project.colaborators) {
        project.colaborators.forEach((collaborator: string) => {
          if (!userIds.has(collaborator)) {
            users.push({ _id: { id: collaborator } });
            userIds.add(collaborator);
          }
        });
      }
    });

    return users;
  }

  onTaskDrop(event: CdkDragDrop<any[]>, newStatusId: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const task = event.container.data[event.currentIndex];
    this.tasksService.updateTask(task._id, { status: newStatusId }).subscribe({
      next: () => console.log('Estado cambiado correctamente'),
      error: (err) => console.error('Error actualizando estado', err),
    });
  }
}
