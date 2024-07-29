import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PwchangesuccessComponent } from './pwchangesuccess/pwchangesuccess.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TermsComponent } from './terms/terms.component';
import { Routes } from '@angular/router';

export const routesConf: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'resetPassword/:token', component: ResetPasswordComponent },
    { path: 'passwordResetSuccess', component: PwchangesuccessComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'terms', component: TermsComponent }
];

