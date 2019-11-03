import { Constants } from '../constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor() {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.endsWith('/auth/login')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem(Constants.LOGIN_TOKEN)}`
        }
      });
    }
    return next.handle(req);
  }

}

