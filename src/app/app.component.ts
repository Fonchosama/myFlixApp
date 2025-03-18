// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false, // REN: Explictly set to false. Deleting this line didn't automatically setting to false. So explicitly set.
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}
