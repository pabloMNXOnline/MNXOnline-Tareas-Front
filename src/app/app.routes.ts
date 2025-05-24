
import { Routes }             from '@angular/router';
import { LoginComponent }     from './login/login.component';
import { ProjectsComponent }  from './projects/projects.component';
import { AuthGuard }          from './auth/auth.guard';
import { SelectProjectsComponent } from './selectprojects/selectprojects.component';
import { CreateProjectComponent } from './views/create-project/create-project.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';


export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'register', component: RegisterUserComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'select-projects',
    component: SelectProjectsComponent,
    canActivate: [AuthGuard], 
  },
  {
    path:'projects/new',
    component: CreateProjectComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' },
];
