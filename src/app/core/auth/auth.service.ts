import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import {
  catchError,
  concatMap,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { AuthState } from './auth.state';
import { AuthStorage } from './auth.storage';
import { tokenIsExpired } from './auth.utils';
import { Credentials, LoginCheck, Roles, URL, User } from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isAuthenticated$ = this.state.isAuthenticated$;
  readonly isNotAuthenticated$ = this.state.isNotAuthenticated$;
  readonly error$ = this.state.error$;

  readonly user$ = this.isAuthenticated$.pipe(
    concatMap((isAuthenticated) =>
      isAuthenticated ? this.getUser() : of(null)
    ),
    shareReplay(1)
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: AuthStorage,
    private state: AuthState
  ) {
    if (this.isValidToken()) {
      this.state.authenticated();
    }
  }

  login(credentials: Credentials): Observable<string> {
    return this.getToken(credentials).pipe(
      tap((token) => {
        this.storage.setToken(token);
        this.state.authenticated();
        this.redirectTo(URL.Domain);
      })
    );
  }

  logout(): void {
    this.storage.clear();
    this.state.clear();
    this.redirectTo(URL.Login);
  }

  isLoggedIn(): boolean {
    return this.isValidToken();
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getCurrentToken(): string {
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
    const token = this.getCurrentToken();
    return token ? !tokenIsExpired(token) : false;
  }

  private getToken(credentials: Credentials): Observable<string> {
    return this.http
      .post<LoginCheck>(`${environment.apiUrl}/login_check`, credentials)
      .pipe(
        catchError((e) => this.handleError(e)),
        map((loginCheck) => loginCheck.token)
      );
  }

  private getUser(): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/user`)
      .pipe(catchError((e) => this.handleError(e)));
  }

  private redirectTo(url: URL): void {
    this.router.navigate([url]);
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    this.state.setError(e.error);
    return throwError(e);
  }
}
