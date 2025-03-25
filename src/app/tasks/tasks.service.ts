import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 


interface Task {
  id: string;
  name: string;
  state_id: string;
  user_id: string;
  project_id: object;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly http = inject(HttpClient)

  public getToDoTasks(): Observable<Task[]> { 
    return this.http.get<Task[]>('http://localhost:3000/tasks/status/67e29589c027ecee744f06b4')
  }

  public getInProcessTasks(): Observable<Task[]> { 
    return this.http.get<Task[]>('http://localhost:3000/tasks/status/67e29598c027ecee744f06b6')
  }

  public getUnderRevisionTasks(): Observable<Task[]> { 
    return this.http.get<Task[]>('http://localhost:3000/tasks/status/67e295a1c027ecee744f06b8')
  }

  public getFinishedTasks(): Observable<Task[]> { 
    return this.http.get<Task[]>('http://localhost:3000/tasks/status/67e295a7c027ecee744f06ba')
  }

  public createTask(task: Task): Observable<Task>{
    return this.http.post<Task>('http://localhost:3000/tasks',task);
  }

  public updateTask(id:string,task:Task): Observable<Task>{
    return this.http.patch<Task>(`http://localhost:3000/tasks/${id}`,task);
  }
}
