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
  readonly isLoading$ = this.state.isLoading$;
  readonly error$ = this.state.error$;
  readonly isAuthenticated$ = this.state.isAuthenticated$;
  readonly isNotAuthenticated$ = this.state.isNotAuthenticated$;

  readonly user$ = this.isAuthenticated$.pipe(
    switchMap((isAuthenticated) =>
      isAuthenticated ? this.client.getUser() : of(null)
    ),
    shareReplay(1)
  );

  readonly token$ = this.isAuthenticated$.pipe(
    map((isAuthenticated) =>
      isAuthenticated && this.isValidToken() ? this.storage.getToken() : null
    )
  );

  constructor(
    private router: Router,
    private client: AuthClient,
    private storage: AuthStorage,
    private state: AuthState
  ) {
    this.isValidToken() && this.state.authenticated();
  }

  login(credentials: Credentials): Observable<string> {
    this.loading();
    return this.client.getToken(credentials).pipe(
      catchError((e) => this.handleError(e)),
      tap((token) => {
        this.success(token);
        this.router.navigate([URL.Domain]);
      })
    );
  }

  logout(): void {
    this.disconnect();
    this.router.navigate([URL.Login]);
  }

  hasRole(role: Roles): Observable<boolean> {
    return this.user$.pipe(
      map((user) => (user ? user.roles : [])),
      map((roles: Roles[]) => roles.includes(role as never)),
      filter((hasRole) => hasRole)
    );
  }

  private isValidToken(): boolean {
    const token = this.storage.getToken();
    return token ? !tokenIsExpired(token) : false;
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    this.error(e);
    return throwError(e);
  }

  private loading() {
    this.state.startLoading();
    this.state.clearError();
  }

  private success(token: string) {
    this.state.stopLoading();
    this.state.clearError();
    this.storage.setToken(token);
    this.state.authenticated();
  }

  private error(e: HttpErrorResponse) {
    this.state.stopLoading();
    this.state.setError(e.error);
  }

  private disconnect() {
    this.storage.clear();
    this.state.notAuthenticated();
  }
}
