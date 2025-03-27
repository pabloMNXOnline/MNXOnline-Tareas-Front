import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsService } from '../projects/projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [MatCardModule,MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  @Input() tasks: any[] = [];
  selectedTaskId: string | null = null;
  constructor(public projectsService: ProjectsService) { }

  private dialog = inject(MatDialog); 

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
          maxWidth: '80vw',
          maxHeight: '80vh', 
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
}
