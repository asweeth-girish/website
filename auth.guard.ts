import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {jwtDecode} from 'jwt-decode';  // correct import after enabling esModuleInterop

interface JwtPayload {
  roles: string[] | string;
}

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['login']);
      return false;
    }

   try {
     const decoded = jwtDecode<JwtPayload>(token);
     console.log('Decoded JWT payload:', decoded);

     let roles: string[] = [];

     if (Array.isArray(decoded.roles)) {
       roles = decoded.roles;
     } else if (typeof decoded.roles === 'string') {
       roles = [decoded.roles];
     } else if ((decoded as any).realm_access?.roles) {
       roles = (decoded as any).realm_access.roles;
     }

     const normalizedRoles = roles.map(r => r.toUpperCase());
     console.log('User roles:', normalizedRoles);

     if (normalizedRoles.includes('ADMIN')) {
       return true;
     } else {
       alert('You do not have permission to access this page');
       this.router.navigate(['dashboard']);
       return false;
     }
   } catch (e) {
     console.error('Token decode error', e);
     this.router.navigate(['/login']);
     return false;
   }

  }
}
