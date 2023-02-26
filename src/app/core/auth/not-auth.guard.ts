import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { URL } from './auth.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isNotAuthenticated$.pipe(
      tap((isNotAuthenticated) =>
        console.log('NotAuthGuard | isNotAuthenticated', isNotAuthenticated)
      ),
      map(
        (isNotAuthenticated) =>
          isNotAuthenticated || this.router.createUrlTree([URL.Domain])
      )
    );
  }
}
