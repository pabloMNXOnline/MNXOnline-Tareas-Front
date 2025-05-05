import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  _id: string;
  name: string;
  // El backend te devuelve el ObjectId en `status`
  status: string;
  user_id: string;
  project_id: object;
  description: string;
  // Si sigues manejando state_id en otros sitios, déjalo también:
  state_id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly http = inject(HttpClient);

  public getToDoTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(
      'http://localhost:3000/tasks/status/67e67c1b2d4890a08460641b'
    );
  }

  public getInProcessTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(
      'http://localhost:3000/tasks/status/67e67c222d4890a08460641d'
    );
  }

  public getUnderRevisionTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(
      'http://localhost:3000/tasks/status/67e67c2a2d4890a08460641f'
    );
  }

  public getFinishedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(
      'http://localhost:3000/tasks/status/67e67c2f2d4890a084606421'
    );
  }

  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:3000/tasks', task);
  }

  public updateTask(id: string, patch: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`http://localhost:3000/tasks/${id}`, patch);
  }
}
