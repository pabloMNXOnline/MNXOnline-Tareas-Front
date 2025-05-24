import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router} from '@angular/router';
import { UsersService } from './user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-register-user',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  hide = true;
  registerForm: FormGroup;
  private usersService = inject(UsersService);
  
  

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      //lastName: ['', [Validators.required]],
      //email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    const payload = this.registerForm.value;
    this.usersService.createUser(payload).subscribe({
      next: user => {
        // Muestra el SweetAlert
        Swal.fire({
          title: '¡Usuario creado!',
          text: `El usuario «${user.username}» se ha registrado correctamente.`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Navega al login
          this.router.navigate(['/login']);
        });
      },
      error: err => {
        console.error('Error al crear usuario', err);
        // Opcional: alerta de error
        Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar el usuario. Inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
