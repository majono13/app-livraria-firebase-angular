import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AutService } from './aut.service';

@Injectable({
  providedIn: 'root'
})
export class AutGuard implements CanActivate {

  constructor(private router: Router, private autService: AutService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.autService.estaAutenticado()
      .pipe(
        tap((b) => {
          if (!b) this.router.navigateByUrl('/login');
        })
      )
  }
}
