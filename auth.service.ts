import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class AuthService {
  private loginUrl = 'http://localhost:8082/login';
    private signupUrl = 'http://localhost:8082/signup';
  constructor(private http: HttpClient){}
login(username:string,password:string): Observable<string> {
    return this.http.post(this.loginUrl,{username,password},{responseType:'text'})
    .pipe(
      tap(tokenWithBearer => {
        const token = tokenWithBearer.startsWith("Bearer ")?tokenWithBearer.substring(7):tokenWithBearer;
        localStorage.setItem('jwt_token',token);
        console.log('token saved',token);
        })
      );
    }
signup(username:string,password:string):Observable<string>{
    return this.http.post(this.signupUrl,{username,password},{responseType:'text'});
    }
logout(){
    localStorage.removeItem('jwt_token')};
isLoggedIn(): boolean{
    return !!localStorage.getItem('jwt_token');}
getToken(): string | null {
    return localStorage.getItem('jwt_token');
    }

  }


