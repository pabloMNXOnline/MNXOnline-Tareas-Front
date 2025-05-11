// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap }       from 'rxjs/operators';
import type { Observable } from 'rxjs';

interface LoginResponse {
  access_token: string;
  user_id:      string;
  username?:    string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('user_id',      res.user_id);
          localStorage.setItem('username',   res.username || '');
        }),
      );
  }
  

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('selected_project_id');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }
  
}
