import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 


interface Project {
    id: string;
    name: string;
    user: string;
    colaborators:Object[];
}

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    private readonly http = inject(HttpClient)

    public getProjectUsers(): Observable<Project>{
        return this.http.get<Project>('http://localhost:3000/projects/67e294e7c027ecee744f06a6/users')
    }

    public getProjectById(id : string) : Observable<Project>{
        return this.http.get<Project>(`http://localhost:3000/projects/${id}`)
    }
}
