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
    return this.http.get<Task[]>('http://localhost:3000/tasks/status/67e52395fdbbf39f531c34fe')
  }

  public getInProcessTasks(): Observable<Task[]> { 
    return this.http.get<Task[]>('http://localhost:3000/tasks/status/67e5239efdbbf39f531c3500')
  }

  public getUnderRevisionTasks(): Observable<Task[]> { 
    return this.http.get<Task[]>('http://localhost:3000/tasks/status/67e523a8fdbbf39f531c3502')
  }

  public getFinishedTasks(): Observable<Task[]> { 
    return this.http.get<Task[]>('http://localhost:3000/tasks/status/67e523adfdbbf39f531c3504')
  }

  public createTask(task: Task): Observable<Task>{
    return this.http.post<Task>('http://localhost:3000/tasks',task);
  }

  public updateTask(id:string,task:Task): Observable<Task>{
    return this.http.patch<Task>(`http://localhost:3000/tasks/${id}`,task);
  }
}
