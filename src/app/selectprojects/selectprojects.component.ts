import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../projects/projects.service';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink,Router  } from '@angular/router';


@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-selectprojects',
  templateUrl: './selectprojects.component.html',
  styleUrls: ['./selectprojects.component.css']
})
export class SelectProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private projectsService: ProjectsService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    if (!userId) {
      this.error = 'Por favor, inicia sesión para ver tus proyectos.';
      return;
    }

    this.loading = true;
    this.projectsService.getByUser(userId).subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando proyectos:', err);
        this.error = 'No se pudieron cargar los proyectos.';
        this.loading = false;
      }
    });
  }
  selectProject(project: Project): void {
    // Guardar en localStorage
    localStorage.setItem('selected_project_id', project._id);
  }
}