import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusesComponent } from '../statuses/statuses.component';
import { inject } from '@angular/core';
import { TaskModalsComponent } from '../task-modals/task-modals.component'
import { MatButtonModule } from '@angular/material/button';
import { ProjectsService } from './projects.service';

export interface Project {
  id: string;
  name: string;
  user: string;
  colaborators: Object[];
}



@Component({
  selector: 'app-projects',
  imports: [StatusesComponent, TaskModalsComponent, MatButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  @Input() project?: Project;

  private readonly projectsService = inject(ProjectsService)

  ngOnInit(): void {
    this.projectsService.getProjectById('67e294e7c027ecee744f06a6').subscribe((project:any) => {
      this.project = project;
      console.log("hola",this.project)
    })
  }
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskModalsComponent, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
