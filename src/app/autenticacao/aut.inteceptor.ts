import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { catchError, throwError } from 'rxjs'
import { AutService } from "./aut.service";


@Injectable()
export class AutInterceptor implements HttpInterceptor {

  constructor(private autService: AutService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (localStorage.getItem('token')) {
      let token: any = localStorage.getItem('token');

      const autReq = req.clone({
        setHeaders: { Authorization: token }
      });

      return next.handle(autReq)
        .pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                this.autService.logout();
                this.router.navigateByUrl('/login');
              }
            }
            return throwError(() => error)
          })
        )
    }

    return next.handle(req);
  }
}
