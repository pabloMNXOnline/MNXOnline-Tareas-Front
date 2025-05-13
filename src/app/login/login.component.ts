// src/app/login/login.component.ts
import { Component }         from '@angular/core';
import { FormsModule }       from '@angular/forms';
import { Router }            from '@angular/router';
import { AuthService }       from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,          // <- habilita standalone component
  imports: [ FormsModule ],  // <- importa ngModel, ngForm, etc.
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/select-projects']),
      error: () => alert('Credenciales inválidas'),
    });
  }
}
