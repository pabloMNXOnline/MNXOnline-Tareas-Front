import { Component,inject,Input, OnInit} from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { TasksService } from '../tasks/tasks.service';
import { forkJoin } from 'rxjs'; 

@Component({
  selector: 'app-statuses',
  imports: [TasksComponent],
  templateUrl: './statuses.component.html',
  styleUrl: './statuses.component.css'
})
export class StatusesComponent implements OnInit{
  @Input() tasks_toDo : any [] = [];
  @Input() tasks_inProcess: any[] = [];
  @Input() tasks_underReview: any[] = [];
  @Input() tasks_finished: any[] = [];

  
  private readonly tasksService = inject(TasksService)

  ngOnInit(): void {
    forkJoin({
      toDo: this.tasksService.getToDoTasks(),
      inProcess: this.tasksService.getInProcessTasks(),
      underReview: this.tasksService.getUnderRevisionTasks(),
      finished: this.tasksService.getFinishedTasks(),
    }).subscribe(({ toDo, inProcess, underReview, finished }) => {
      this.tasks_toDo = toDo;
      this.tasks_inProcess = inProcess;
      this.tasks_underReview = underReview;
      this.tasks_finished = finished;
      console.log('Tareas cargadas:', { toDo, inProcess, underReview, finished });
    });
  }
  

} 
