import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { consoleDevMode } from '../utils';
import { URL } from './auth.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isAuthenticated$.pipe(
      tap((isAuthenticated) =>
        consoleDevMode.log('AuthGuard | isAuthenticated', isAuthenticated)
      ),
      map(
        (isAuthenticated) =>
          isAuthenticated || this.router.createUrlTree([URL.Login])
      )
    );
  }
}
