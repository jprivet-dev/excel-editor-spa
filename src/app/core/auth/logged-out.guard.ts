import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { URL } from './models';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.auth.isLoggedOut() || this.router.createUrlTree([URL.Domain]);
  }
}
