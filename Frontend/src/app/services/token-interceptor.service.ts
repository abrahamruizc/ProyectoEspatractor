import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import {AuthService} from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private authService: AuthService) { }

  intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }) {
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `token ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
