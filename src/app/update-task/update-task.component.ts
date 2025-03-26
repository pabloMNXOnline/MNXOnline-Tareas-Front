import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Importar MatSelect
import { TasksService } from '../tasks/tasks.service';

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
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {
  taskForm: FormGroup;
  taskId: string;
  allUsers: any[];

  constructor(
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tasksService: TasksService,
  ) {
    this.allUsers = [this.data.projectUsers.user, ...this.data.projectUsers.colaborators];
    this.taskId = data.id;
    this.taskForm = this.fb.group({
      name: [data.name || ''],
      description: [data.description || ''],
      status: [data.status._id || '67e29589c027ecee744f06b4'],
      user: [this.data.projectUsers.user ? this.data.projectUsers.user._id : null]
    });
    console.log(this.taskForm);
    console.log(this.getStatusLabel('67e29598c027ecee744f06b6'));
  }


  // 🔹 Función para obtener el nombre del estado
  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      '67e29589c027ecee744f06b4': 'To Do',
      '67e29598c027ecee744f06b6': 'In Process',
      '67e295a1c027ecee744f06b8': 'Under Review',
      '67e295a7c027ecee744f06ba': 'Finished'
    };
    return statusMap[status] || 'Desconocido'
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
}
