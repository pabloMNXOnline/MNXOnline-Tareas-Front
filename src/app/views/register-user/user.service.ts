import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  name: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);


  public createUser(payload: User): Observable<User>{
    return this.http.post<User>(
        'http://localhost:3000/users',
        payload
    )
  }
}
