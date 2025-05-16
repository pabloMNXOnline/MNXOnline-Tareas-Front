// src/app/login/login.component.ts
import { Component }         from '@angular/core';
import { FormsModule }       from '@angular/forms';
import { Router, RouterModule }            from '@angular/router';
import { AuthService }       from '../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ], // <- importa ngModel, ngForm, etc.
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
})
export class LoginComponent {
  username = '';
  password = '';
  hide = true;

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
