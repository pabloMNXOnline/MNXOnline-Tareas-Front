// src/app/app.routes.ts
import { Routes }             from '@angular/router';
import { LoginComponent }     from './login/login.component';
import { ProjectsComponent }  from './projects/projects.component';
import { AuthGuard }          from './auth/auth.guard';

export const appRoutes: Routes = [
  // 1) Ruta pública: login
  { path: 'login', component: LoginComponent },

  // 2) Ruta protegida: dashboard/proyectos
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
  },

  // 3) Ruta por defecto: redirige a login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 4) Cualquier otra: redirige a login o a 404
  { path: '**', redirectTo: 'login' },
];
