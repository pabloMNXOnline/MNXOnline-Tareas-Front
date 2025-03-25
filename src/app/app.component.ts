import { Component } from '@angular/core';
import {MatGridListModule } from '@angular/material/grid-list';
import { ProjectsComponent } from './projects/projects.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [MatGridListModule,ProjectsComponent, MatCardModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MNXTrello';
}
