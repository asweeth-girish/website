import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{
    const token = localStorage.getItem('jwt_token');
    if(token){
      const cloned = req.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      });
    return next.handle(cloned);
    }
  return next.handle(req);
  }
}
