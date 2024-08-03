import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ImpressComponent } from '../app/impress/impress.component';
import { AgbComponent } from '../app/agb/agb.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule, MatSelectModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatMenuModule,
    CommonModule, MatIconModule, HttpClientModule, TranslateModule, MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  showContactEmail: boolean = false;
  selectedLanguage: string = 'en';
  languages = [
    { code: 'de', label: 'Deutsch', flag: 'assets/i18n/images/de.svg' },
    { code: 'nz', label: 'New Zealand', flag: 'assets/i18n/images/nz.svg' },
    { code: 'br', label: 'Brazil', flag: 'assets/i18n/images/br.svg' },
    { code: 'es', label: 'Espanol', flag: 'assets/i18n/images/es.svg' },
  ];

  @ViewChild('sidenav') sidenav?: MatSidenav;

  constructor(
    private router: Router,
    private translate: TranslateService,
    public dialog: MatDialog,
    private viewPortScroller: ViewportScroller
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.viewPortScroller.scrollToPosition([0, 0]);
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]).then(() => {
      this.viewPortScroller.scrollToPosition([0, 0]);
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  openImpressumDialog() {
    this.dialog.open(ImpressComponent);
  }

  openAgbDialog() {
    const dialogRef = this.dialog.open(AgbComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
      }
    });
  }

  closeSidenav() {
    this.sidenav?.close();
  }
}
