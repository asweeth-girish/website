import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector:'app-dashboard',
  standalone:true,
  template:`
  <h2>dashboard</h2>
  <button (click)="goPrivate()">Go to private page</button>
   <button (click)="goLogout()">Logout</button>
  `
})

export class DashboardComponent{
  constructor(private router:Router,private authService:AuthService){}

  goPrivate(){
    this.router.navigate(['/private']);
    }


  goLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    }

}
