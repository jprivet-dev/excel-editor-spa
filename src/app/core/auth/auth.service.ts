import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthClient } from './auth.client';
import { Credentials, Roles, URL } from './auth.models';
import { AuthState } from './auth.state';
import { AuthStorage } from './auth.storage';
import { tokenIsExpired } from './auth.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isAuthenticated$ = this.state.isAuthenticated$;
  readonly isNotAuthenticated$ = this.state.isNotAuthenticated$;

  readonly error$ = this.state.error$;

  readonly user$ = this.isAuthenticated$.pipe(
    switchMap((isAuthenticated) =>
      isAuthenticated ? this.client.getUser() : of(null)
    ),
    shareReplay(1)
  );

  readonly token$ = this.isAuthenticated$.pipe(
    map((isAuthenticated) =>
      isAuthenticated && this.isValidToken() ? this.getToken() : null
    )
  );

  constructor(
    private router: Router,
    private client: AuthClient,
    private storage: AuthStorage,
    private state: AuthState
  ) {
    if (this.isValidToken()) {
      this.state.authenticated();
    }
  }

  login(credentials: Credentials): Observable<string> {
    return this.client.getToken(credentials).pipe(
      catchError((e) => this.handleError(e)),
      tap((token) => {
        this.storage.setToken(token);
        this.state.authenticated();
        this.router.navigate([URL.Domain]);
      })
    );
  }

  logout(): void {
    this.storage.clear();
    this.state.clear();
    this.router.navigate([URL.Login]);
  }

  getToken(): string {
    return this.storage.getToken();
  }

  hasRole(role: Roles): Observable<boolean> {
    return this.user$.pipe(
      map((user) => (user ? user.roles : [])),
      map((roles: Roles[]) => roles.includes(role as never)),
      filter((hasRole) => hasRole)
    );
  }

  private isValidToken(): boolean {
    const token = this.getToken();
    return token ? !tokenIsExpired(token) : false;
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    this.state.setError(e.error);
    return throwError(e);
  }
}
