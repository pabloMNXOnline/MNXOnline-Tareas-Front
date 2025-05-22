import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StatusesComponent } from '../../statuses/statuses.component';
import { TagModalComponent } from '../../tag-modal/tag-modal.component';
import { TaskModalsComponent } from '../../task-modals/task-modals.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ProjectsService } from '../../projects/projects.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private projectsService = inject(ProjectsService);
  private auth            = inject(AuthService);
  private router          = inject(Router);

  constructor(public dialog: MatDialog) {}

  @Input() projectName: string | null | undefined = null;
  @Input() username: string | null = null;

  @Output() back      = new EventEmitter<void>();
  @Output() newTask   = new EventEmitter<void>();
  @Output() newTag    = new EventEmitter<void>();
  @Output() logout    = new EventEmitter<void>();
  @ViewChild(StatusesComponent) statusesComponent!: StatusesComponent;
  
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
  
    goToSelectProjects(): void {
      this.router.navigate(['/select-projects']);
    }
}
