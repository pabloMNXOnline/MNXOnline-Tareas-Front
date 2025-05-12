import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TasksService } from '../tasks/tasks.service';
import { TagModalService } from '../tag-modal/tag-modal.service';



export interface LabelData {
  _id: string;
  name: string;
  color: string;
}

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit{

  
  taskForm: FormGroup;
  taskId: string;
  allUsers: any[];
  allLabels: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tasksService: TasksService,
  ) {
    this.allUsers = [this.data.projectUsers.user, ...this.data.projectUsers.colaborators];
    this.taskId = data.id;

    console.log("Datos recibidos:", data);
    console.log("this.data.projectUsers.user:", this.data.projectUsers.user);
    this.taskForm = this.fb.group({
      name: [data.name || ''],
      description: [data.description || ''],
      status: [data.status._id || '67e29589c027ecee744f06b4'],
      labels: [data.labels.map((label: LabelData) => label._id) || []],
      user: [data.user != null ? data.user._id : null]
    });
    console.log("Valor inicial del formulario:", this.taskForm.value); // Agrega este console.log
    console.log(this.getStatusLabel('67e29598c027ecee744f06b6'));
  }

  private readonly tagService = inject(TagModalService)

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      '67e52395fdbbf39f531c34fe': 'To Do',
      '67e5239efdbbf39f531c3500': 'In Process',
      '67e523a8fdbbf39f531c3502': 'Under Review',
      '67e523adfdbbf39f531c3504': 'Finished'
    };
    return statusMap[status] || 'Desconocido';
  }

  ngOnInit(): void {
    const projectId = localStorage.getItem('selected_project_id');
  
    if (!projectId) {
      console.error('No hay proyecto seleccionado en localStorage');
      // aquí puedes redirigir, mostrar un mensaje al usuario, etc.
      return;
    }
  
    this.tagService.getTagByProject(projectId)
      .subscribe(labels => {
        this.allLabels = labels;
      });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const updatedTask = { ...this.taskForm.value, id: this.taskId };

      this.tasksService.updateTask(this.taskId, updatedTask).subscribe({
        next: (response) => {
          console.log('Tarea actualizada:', response);
          this.dialogRef.close(response);
        },
        error: (error) => console.error('Error al actualizar la tarea:', error)
      });
    }
  }

  onCancel() {
    console.log("Cancelar clickeado"); // Agrega este console.log
    this.dialogRef.close(null);
    console.log("Diálogo cerrado con null"); // Agrega este console.log
  }
}