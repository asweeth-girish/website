import { Component } from '@angular/core';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { PrivateComponent } from './private.component';
import {RouterModule} from '@angular/router';
@Component({
  selector:'app-root',
  standalone:true,
  imports:[RouterModule],
  template:`
  <router-outlet></router-outlet>
  `
})
export class AppComponent{}

