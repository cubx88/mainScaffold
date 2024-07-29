
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routesConf } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routesConf), provideHttpClient(), provideToastr(), provideAnimations()]
};

