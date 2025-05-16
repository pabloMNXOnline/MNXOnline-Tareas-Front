import { Component, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../../projects/projects.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input() project: Project | null = null;

  constructor(private router: Router) {}

  openProject() {
    if (!this.project) { return; }
    // guarda y navega
    localStorage.setItem('selected_project_id', this.project._id);
    this.router.navigate(['/projects', this.project._id]);
  }
}
