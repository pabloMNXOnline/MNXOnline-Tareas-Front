import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

interface Status {
  _id: string;
  name: string;
  project_id: object;
  timeToDo: Date;
  timeInProcess: Date;
  timeInRevision: Date;
}

@Injectable({
  providedIn: 'root',
})
export class StatusesService {
  private readonly http = inject(HttpClient);

  public getStates(id : string): Observable<Status[]> {
    return this.http.get<Status[]>(
      `http://localhost:3000/states/project/${id}`
    );
  }
}
