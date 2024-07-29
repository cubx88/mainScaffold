import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  template: "",
  imports: [FormsModule],
})
export class DemoComponent {
  name = '';
}

bootstrapApplication(AppComponent, appConfig);
