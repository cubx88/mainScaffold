import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { ImpressComponent } from './impress/impress.component';
import { AgbComponent } from './agb/agb.component';
import { IntroComponent } from './intro/intro.component';
import { RegformComponent } from './regform/regform.component';
import { Routes } from '@angular/router';

export const routesConf: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'impress', component: ImpressComponent },
    { path: 'agb', component: AgbComponent },
    { path: 'intro', component: IntroComponent },
    { path: 'regform', component: RegformComponent }
];
