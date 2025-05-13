import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-task-modals',
  standalone: true, // Asegura que se reconozcan los imports
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './task-modals.component.html',
  styleUrl: './task-modals.component.css',
})
export class TaskModalsComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tasksService: TasksService// 🔹 Inyectamos correctamente el servicio
  ) {
    const project = localStorage.getItem('selected_project_id');
    this.taskForm = this.fb.group({
      name: [''],
      description: [''],
      status: ['67e67c1b2d4890a08460641b'],
      user: [null],
      project: [project],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.taskForm.value);

    // 🔹 Llamamos al servicio para guardar la tarea
    this.tasksService.createTask(this.taskForm.value).subscribe({
      next: (created) => {
        console.log('Tarea creada:', created);
        this.dialogRef.close(created);
      },
      error: (error) => console.error('Error al crear la tarea:', error),
    });
  }
}
