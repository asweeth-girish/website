import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { AppComponent } from './app.component';
import { provideRouter, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from './dashboard.component';
import { AdminModuleComponent } from './admin-module.component'; // ← Import this
import { AuthGuard } from './app/auth.guard'; // ← Your guard

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'private', component: PrivateComponent, canActivate: [AuthGuard] },
  {
    path: 'admin-modules',
    component: AdminModuleComponent,
    canActivate: [AuthGuard] // Protect with role-based guard
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
});

