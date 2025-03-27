import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Observable } from 'rxjs';

interface Status{
  _id: string,
  name: string,
  project_id: object,
  timeToDo: Date,
  timeInProcess:Date,
  timeInRevision:Date
}

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  private readonly http = inject(HttpClient)

  public getStates():Observable<Status[]>{
    return this.http.get<Status[]>('http://localhost:3000/states/project/67e5235cfdbbf39f531c34fb');
  }
}
