import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AdminModuleComponent } from './admin-module.component'; // Make sure path is correct

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [AdminModuleComponent],
  template: `
   <button (click)="logout()">Logout</button>

    <hr />

    <!-- This is the missing part -->
    <app-admin-module></app-admin-module>
  `
})
export class PrivateComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
