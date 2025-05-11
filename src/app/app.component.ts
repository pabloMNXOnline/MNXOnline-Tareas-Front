import { Component } from '@angular/core';
import {MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [MatGridListModule,RouterOutlet, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MNXTrello';
}
