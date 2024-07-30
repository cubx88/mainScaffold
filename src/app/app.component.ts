import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatMenuModule, CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear: number = new Date().getFullYear();
  showContactEmail: boolean = false;

  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
