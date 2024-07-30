import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatSelectModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatMenuModule, CommonModule, MatIconModule,
    HttpClientModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear: number = new Date().getFullYear();
  showContactEmail: boolean = false;


  selectedLanguage: string = 'en';
  languages = [
    { code: 'en', label: 'English', flag: 'assets/images/en.png' },
    { code: 'fr', label: 'Français', flag: 'assets/images/fr.png' },
    { code: 'de', label: 'Deutsch', flag: 'assets/images/de.png' },
  ];
  constructor(private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
