import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { URL } from './auth.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    console.log('AuthGuard | canActivate() | pending...');
    return this.auth.isAuthenticated$.pipe(
      tap((isAuthenticated) =>
        console.log(
          'AuthGuard | canActivate() | isAuthenticated',
          isAuthenticated
        )
      ),
      map(
        (isAuthenticated) =>
          isAuthenticated || this.router.createUrlTree([URL.Login])
      )
    );
  }
}
