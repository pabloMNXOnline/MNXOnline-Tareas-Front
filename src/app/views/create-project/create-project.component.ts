import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ProjectsService } from '../../projects/projects.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../components/header/header.component';



@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  imports: [ CommonModule, ReactiveFormsModule, ReactiveFormsModule, HeaderComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule],
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  submitting = false;
  username: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsService,
    private auth: AuthService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    if (!userId) {
      // handle missing user, e.g., redirect to login
      console.error('User ID not found in localStorage');
      return;
    }
    // add hidden user control
    this.projectForm.addControl('user', this.fb.control(userId));
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload = this.projectForm.value;

    this.projectService.createProject(payload).subscribe({
      next: (res) => {
        console.log('Project created', res);
        // e.g. navigate to project list
      },
      error: (err) => {
        console.error('Error creating project', err);
        this.submitting = false;
      }
    });
    this.router.navigate(['/select-projects']);
    
  }

  onLogout(): void {
      this.auth.logout();
      this.router.navigate(['/login']);
    }
}