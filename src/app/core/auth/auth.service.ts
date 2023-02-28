import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  concatMap,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
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

  readonly token$ = this.isAuthenticated$.pipe(
    map((isAuthenticated) =>
      isAuthenticated && this.isTokenNotExpired()
        ? this.storage.getToken()
        : null
    ),
    distinctUntilChanged(),
    shareReplay(1)
  );

  readonly user$ = this.token$.pipe(
    concatMap((token) => {
      console.log('AuthService | isAuthenticated', token);
      return token ? this.client.getUser() : of(null);
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(
    private router: Router,
    private client: AuthClient,
    private storage: AuthStorage,
    private state: AuthState
  ) {
    // Checks that a token exists and forces authentication when the page is fully reloaded.
    this.isTokenNotExpired() && this.state.authenticated();
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

  isGranted(role: Roles): Observable<boolean> {
    return this.user$.pipe(
      map((user) => (user ? user.roles : [])),
      map((roles: Roles[]) => roles.includes(role as never))
    );
  }

  private isTokenNotExpired(): boolean {
    const token = this.storage.getToken();
    return token ? !tokenIsExpired(token) : false;
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    this.error(e);
    return throwError(e);
  }

  private loading(): void {
    this.state.startLoading();
    this.state.clearError();
  }

  private success(token: string): void {
    this.state.stopLoading();
    this.state.clearError();
    this.storage.setToken(token);
    this.state.authenticated();
  }

  private error(e: HttpErrorResponse): void {
    this.state.stopLoading();
    this.state.setError(e.error);
  }

  private disconnect(): void {
    this.storage.clear();
    this.state.notAuthenticated();
  }
}
