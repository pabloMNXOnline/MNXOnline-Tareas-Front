import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tasks',
  imports: [MatCardModule,MatDialogModule, MatButtonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  @Input() tasks: any[] = [];
  selectedTaskId: string | null = null;

  private dialog = inject(MatDialog); // Inyección con `inject()`, más moderno que en el constructor

  ngOnInit(): void {
    if (!Array.isArray(this.tasks)) {
      console.warn('⚠️ tasks no es un array válido');
      this.tasks = [];
    }
  }

  openUpdateForm(task: any) {
    console.log("Abrir formulario de actualización para:", task);
    this.selectedTaskId = task._id;

    this.dialog.open(UpdateTaskComponent, {
      width: '700px',
      data: { ...task, id: this.selectedTaskId }
    });
  }
}
