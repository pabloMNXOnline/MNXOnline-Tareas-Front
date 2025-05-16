import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../projects/projects.service';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink,Router  } from '@angular/router';
import { FormsModule }          from '@angular/forms';
import { MatCardModule }        from '@angular/material/card';
import { MatIconModule }        from '@angular/material/icon';
import { MatButtonModule }      from '@angular/material/button';
import { ProjectCardComponent } from '../components/project-card/project-card.component';


@Component({
  imports: [CommonModule, RouterLink, FormsModule, MatCardModule, MatIconModule, MatButtonModule,ProjectCardComponent],
  selector: 'app-selectprojects',
  templateUrl: './selectprojects.component.html',
  styleUrls: ['./selectprojects.component.css']
})
export class SelectProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = false;
  error: string | null = null;
  username: string | null = null;

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
    this.username = this.auth.getUsername();
    this.loading = true;
    this.projectsService.getByUser(userId).subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
        console.log('Proyectos cargados:', this.projects);
      },
      error: (err) => {
        console.error('Error cargando proyectos:', err);
        this.error = 'No se pudieron cargar los proyectos.';
        this.loading = false;
      }
    });
  }
  selectProject(project: Project): void {
    localStorage.setItem('selected_project_id', project._id);
  }


  statusClass(status: string) {
    return status.toLowerCase().includes('track') ? 'on-track' : 'on-hold';
  }

  createProject() {
    this.router.navigate(['/projects/new']);
  }
}