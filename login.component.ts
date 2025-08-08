import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector:'app-login',
  standalone:true,
  imports:[FormsModule,CommonModule,RouterModule],
  template:`
    <div class ='login-container'>
    <h2>Login</h2>
    <form (ngSubmit)="onLogin()">
    <label>Username:
    <input [(ngModel)]="username" name="username" required />
    </label>
    <br />
    <label>Password:
    <input [(ngModel)]="password" name="password" type="password" required />
    </label>
    <br />
    <button type="submit">Login</button>
    </form>
    <p>Dont have an account? <a routerLink="/signup">Signup</a></p>
</div>
     <p *ngIf="error" style="color:red">{{ error }}</p>
        <p *ngIf="success" style="color:green">Login successful!</p>

   `
   })
export class LoginComponent{
  username='';
  password='';
  error='';
  success=false;

  constructor(private authService: AuthService,private router:Router){}

  onLogin(){
    this.error ='';
    this.success=false;
    this.authService.login(this.username,this.password).subscribe({
      next:()=>{
        this.success = true;
        this.error ='';
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
        },
      error:()=>{
        this.error='login failed.please check your username or password';
        this.success=false;
        }

      });
  }
  }

