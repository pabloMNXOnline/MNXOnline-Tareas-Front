import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  _id: string;
  name: string;
  user: any;
  colaborators: Object[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly http = inject(HttpClient);


  public getProjectUsers(): Observable<Project> {
    return this.http.get<Project>(
      'http://localhost:3000/projects/67e67ba92d4890a084606415/users'
    );
  }

  public getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`http://localhost:3000/projects/${id}`);
  }
  
  public getByUser(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(
      `http://localhost:3000/projects/user/${userId}`
    );
  }
  public createProject(payload: Project): Observable<Project> {
    return this.http.post<Project>(
      'http://localhost:3000/projects',
      payload
    );
  }

  public deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(
      `http://localhost:3000/projects/${id}`
    );
  }
}
