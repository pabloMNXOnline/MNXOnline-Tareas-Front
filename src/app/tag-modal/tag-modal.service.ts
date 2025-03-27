import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 


interface Label {
  id: string;
  name: string;
  color: string;
  project_id: object;
}

@Injectable({
  providedIn: 'root'
})
export class TagModalService {

  private readonly http = inject(HttpClient)

  public createTag(label: Label): Observable<Label>{
    return this.http.post<Label>('http://localhost:3000/labels',label);
  }

  public updateTag(id:string,label:Label): Observable<Label>{
    return this.http.patch<Label>(`http://localhost:3000/labels/${id}`,label);
  }

  public getTagByProject(id: string): Observable <Label[]>{
    return this.http.get<Label[]>('http://localhost:3000/labels/project/67e5235cfdbbf39f531c34fb');
  }
}
