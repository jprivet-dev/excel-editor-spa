import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import { AuthState } from './auth.state';
import { AuthStorage } from './auth.storage';
import { Credentials, LoginCheck, URL } from './models';
import { tokenIsExpired } from './token.utils';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isAuthenticated$ = this.state.isAuthenticated$;
  readonly isNotAuthenticated$ = this.state.isNotAuthenticated$;
  readonly error$ = this.state.error$;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: AuthStorage,
    private state: AuthState,
    private userService: UserService
  ) {}

  login(credentials: Credentials): Observable<LoginCheck> {
    return this.http
      .post<LoginCheck>(`${environment.apiUrl}/login_check`, credentials)
      .pipe(
        catchError((e) => this.handleError(e)),
        tap((loginCheck) => {
          this.storage.setToken(loginCheck.token);
          this.state.applyIsAuthenticated();
          this.router.navigate([URL.Domain]);
        }),
        shareReplay()
      );
  }

  logout(): void {
    this.userService.clearUser();
    this.storage.removeToken();
    this.state.applyIsNotAuthenticated();
    this.router.navigate([URL.Login]);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !tokenIsExpired(token) : false;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getToken(): string {
    return this.storage.getToken();
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    this.state.setError(e.error);
    return throwError(e);
  }
}
