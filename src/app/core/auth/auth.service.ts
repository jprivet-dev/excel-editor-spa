import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  concatMap,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { AuthClient } from './auth.client';
import { Credentials, Roles, Token, URL, User } from './auth.models';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isLoading$ = this.state.isLoading$;
  readonly error$ = this.state.error$;
  readonly isAuthenticated$ = this.state.isAuthenticated$;
  readonly isNotAuthenticated$ = this.state.isNotAuthenticated$;

  readonly user$ = this.state.token$.pipe(
    concatMap((token) => (token ? this.retrieveUser() : of(null)))
  );

  constructor(
    private router: Router,
    private client: AuthClient,
    private state: AuthState
  ) {
    this.state.retrieveToken();
  }

  login(credentials: Credentials): Observable<Token> {
    this.state.clearError();
    this.state.startLoading();

    // STEP 1: Check the credentials
    // STEP 2: Get and store the token
    // STEP 3: Go on homepage
    return this.client.login(credentials).pipe(
      catchError((e) => this.handleError(e)),
      tap((token) => this.state.setToken(token)),
      tap(() => this.router.navigate([URL.Home]))
    );
  }

  logout(): void {
    this.state.logout();
    this.router.navigate([URL.Login]);
  }

  getToken(): Token {
    return this.state.getToken();
  }

  isGranted(role: Roles): Observable<boolean> {
    return this.user$.pipe(
      map((user) => (user ? user.roles : [])),
      map((roles: Roles[]) => roles.includes(role as never))
    );
  }

  private retrieveUser(): Observable<User | null> {
    // If the user is already stored in the SPA, get it,
    // otherwise retrieve the user from the API and store it.
    return this.state.isUserExist()
      ? of(this.state.getUser())
      : this.client.getUser().pipe(tap((user) => this.state.setUser(user)));
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    this.state.stopLoading();
    this.state.setError(e.error);
    return throwError(e);
  }
}
