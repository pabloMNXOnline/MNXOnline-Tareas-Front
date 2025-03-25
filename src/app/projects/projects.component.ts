import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusesComponent } from '../statuses/statuses.component';
import { StatusesService } from '../statuses/statuses.service';
import { inject } from '@angular/core';
import { TaskModalsComponent } from '../task-modals/task-modals.component'



@Component({
  selector: 'app-projects',
  imports: [StatusesComponent, TaskModalsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  @Input() statuses : any[] = [];

  private readonly statusesService = inject(StatusesService)

  ngOnInit(): void {
    this.statusesService.getStates().subscribe((status:any[]) => {
      this.statuses = status;
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
