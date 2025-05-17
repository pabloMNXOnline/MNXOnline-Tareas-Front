// src/app/projects/projects.component.ts
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router }                from '@angular/router';
import { MatDialog }             from '@angular/material/dialog';
import { MatButtonModule }       from '@angular/material/button';
import { MatIconModule }         from '@angular/material/icon';
import { CommonModule }          from '@angular/common';
import { StatusesComponent }     from '../statuses/statuses.component';
import { TaskModalsComponent }   from '../task-modals/task-modals.component';
import { TagModalComponent }     from '../tag-modal/tag-modal.component';
import { ProjectsService, Project } from './projects.service';
import { AuthService }           from '../auth/auth.service';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatMenuModule }     from '@angular/material/menu';

@Component({
  selector: 'app-projects',
  standalone: true,    // ← necesario para usar `imports` aquí
  imports: [
    CommonModule,
    StatusesComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,

  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],  // ← plural
})
export class ProjectsComponent implements OnInit {
  @ViewChild(StatusesComponent) statusesComponent!: StatusesComponent;

  project?: Project;  
  username: string | null = localStorage.getItem('username');

  private projectsService = inject(ProjectsService);
  private auth            = inject(AuthService);
  private router          = inject(Router);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const projectId = localStorage.getItem('selected_project_id');
    if (!projectId) {
      console.error('No hay ningún proyecto seleccionado');
      return;
    }

    this.projectsService.getProjectById(projectId).subscribe({
      next: project => {
        this.project = project;
        console.log('Proyecto cargado:', this.project);
      },
      error: err => {
        console.error('Error al cargar proyecto:', err);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskModalsComponent, {
      width: '800px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(newTask => {
      if (newTask) this.statusesComponent.addTask(newTask);
    });
  }

  openTagModal(): void {
    const dialogRef = this.dialog.open(TagModalComponent, {
      width: '800px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.statusesComponent.addTask(result);
    });
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
