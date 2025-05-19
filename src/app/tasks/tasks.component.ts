import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsService } from '../projects/projects.service';
import { CommonModule } from '@angular/common';
import { MatIconModule }   from '@angular/material/icon';
import { MatChipsModule }  from '@angular/material/chips';
import { TasksService } from './tasks.service';


@Component({
  selector: 'app-tasks',
  imports: [MatCardModule,MatDialogModule, MatButtonModule, CommonModule, MatIconModule, MatChipsModule,],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  @Input() tasks: any[] = [];
  selectedTaskId: string | null = null;

  gradientMap: { [status: string]: string } = {
    'To do'       : 'linear-gradient(90deg, #FF5F5F 0%, #FDA600 100%)',
    'In Process'  : 'linear-gradient(90deg, #FDA600 0%, #FFEC00 100%)',
    'Under Review': 'linear-gradient(90deg, #DAF800 0%, #009665 100%)',
    'Finished'    : 'linear-gradient(90deg, #009565 0%, #005E7A 100%)',
  };
  constructor(
    public projectsService: ProjectsService,
    public tasksservice: TasksService,
  ) { }

  private dialog = inject(MatDialog); 

  trackById(index: number, task: any) {
    return task._id;
  }

  ngOnInit(): void {
    if (!Array.isArray(this.tasks)) {
      console.warn('⚠️ tasks no es un array válido');
      this.tasks = [];
    }
    
  }

  openUpdateForm(task: any) {
    console.log("Abrir formulario de actualización para:", task);
    this.selectedTaskId = task._id;
  
    this.projectsService.getProjectUsers().subscribe(
      (datosProyecto) => {
        console.log("Estos son los datos del proyecto ", datosProyecto);
        this.dialog.open(UpdateTaskComponent, {
          maxWidth: '120vw',
          maxHeight: '120vh', 
          panelClass: 'custom-dialog',
          data: { ...task, id: this.selectedTaskId, projectUsers: datosProyecto }
        });
      },
      (error) => {
        console.error("Error al obtener datos del proyecto:", error);
        // Manejar el error apropiadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  onDeleteClick(task: any, event: MouseEvent) {
    // evitamos que el click se propague (y abra otros dialogs, etc.)
    event.stopPropagation();

    // mostramos confirmación nativa o con window.confirm
    const ok = window.confirm(`¿Seguro que quieres eliminar la tarea “${task.name}”?`);
    if (!ok) return;

    // si confirma, llamamos al servicio
    this.tasksservice.deleteTask(task._id).subscribe({
      next: () => {
        // actualizamos localmente el array para quitar la tarea
        this.tasks = this.tasks.filter(t => t._id !== task._id);
      },
      error: err => {
        console.error('Error al eliminar tarea:', err);
        // aquí podrías mostrar un snack/barra de error
      }
    });
  }
}
