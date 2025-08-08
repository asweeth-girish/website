import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import {CommonModule} from '@angular/common';
import { Router ,RouterModule} from '@angular/router';
@Component({
  selector:'app-signup',
  standalone:true,
  imports:[FormsModule,CommonModule,RouterModule],
  template:`
  <div class ="signup-container">
  <h2>Sign Up</h2>
  <form (ngSubmit)="onSignup()">
  <label>Username:
        <input [(ngModel)]="username" name="username" required />
      </label>
      <br />
      <label>Password:
        <input [(ngModel)]="password" name="password" type="password" required />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
      <p>Already have an account? <a routerLink="/login">Login</a></p>


    <p *ngIf="error" style="color:red">{{ error }}</p>
    <p *ngIf="success" style="color:green">{{ success }}</p>
    </div>
  `
  })

export class SignupComponent{
  username='';
  password='';
  error='';
  success='';

  constructor(private authService:AuthService,private router:Router){}

  onSignup(){
    this.error='';
    this.success='';
    this.authService.signup(this.username,this.password).subscribe({
      next:(msg)=>{
        this.success=msg;
        setTimeout(() => this.router.navigate(['/login']), 1000);
        },
      error: (err) => {
        console.error('Signup error:', err);

      if (err.status === 0) {
          this.error = 'Server is unreachable or not responding. Please try again later.';
        }
      else if (err.error && typeof err.error === 'string') {
          this.error = err.error;
        }
      else {
          this.error = 'Signup failed. Please try again.';
        }
      }


    });
  }
}




