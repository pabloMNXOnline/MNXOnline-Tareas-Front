import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusesComponent } from '../statuses/statuses.component';
import { inject } from '@angular/core';
import { TaskModalsComponent } from '../task-modals/task-modals.component';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsService } from './projects.service';
import { TagModalComponent } from '../tag-modal/tag-modal.component';
import { CommonModule } from '@angular/common';

export interface Project {
  id: string;
  name: string;
  user: any;
  colaborators: Object[];
}

@Component({
  selector: 'app-projects',
  imports: [
    StatusesComponent,
    TaskModalsComponent,
    MatButtonModule,
    TagModalComponent,
    CommonModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  @Input() project?: Project;

  @ViewChild(StatusesComponent) statusesComponent!: StatusesComponent;

  private readonly projectsService = inject(ProjectsService);

  ngOnInit(): void {
    this.projectsService
      .getProjectById('67e67ba92d4890a084606415')
      .subscribe((project: any) => {
        this.project = project;
        console.log('hola', this.project);
      });
  }
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskModalsComponent, {
      width: '800px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((newTask) => {
      // Si el usuario canceló, newTask será falsy
      if (!newTask) return;

      // Llamamos al método público del hijo para añadirla
      this.statusesComponent.addTask(newTask);
    });
  }

  openTagModal() {
    const dialogRef = this.dialog.open(TagModalComponent, {
      width: '800px', // Ajusta el ancho según sea necesario
      data: {}, // Puedes pasar datos iniciales al modal si es necesario
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Datos de la etiqueta:', result);
      // Aquí puedes manejar los datos de la etiqueta (result)
      if (result) {
        console.log('Tarea creada desde modal:', result);
        this.statusesComponent.addTask(result); // 👈 aquí le pasas la tarea al hijo
      }
    });
  }
}
