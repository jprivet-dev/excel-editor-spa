import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import {
  catchError,
  concatMap,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { AuthState } from './auth.state';
import { AuthStorage } from './auth.storage';
import { Credentials, LoginCheck, URL, User } from './models';
import { tokenIsExpired } from './token.utils';
import { UserService } from './user.service';

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
    )
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: AuthStorage,
    private state: AuthState,
    private userService: UserService
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
    this.userService.clearUser();
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
