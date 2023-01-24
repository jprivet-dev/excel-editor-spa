import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';
import { URL, User } from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ID_TOKEN = 'id_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/login_check`, {
        username,
        password,
      })
      .pipe(
        tap((user) => {
          this.setToken(user);
          this.router.navigate([URL.Domain]);
        }),
        shareReplay()
      );
  }

  private setToken(user: User): void {
    localStorage.setItem(this.ID_TOKEN, user.token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.ID_TOKEN);
  }

  // @see https://stackoverflow.com/a/60758392/13480534
  private isExpired(token: string): boolean {
    const result = token.split('.');

    if (result.length === 3) {
      const exp = JSON.parse(atob(result[1])).exp;
      const now = Math.floor(new Date().getTime() / 1000);
      return now >= exp;
    }

    return false;
  }

  logout(): void {
    this.removeToken();
    this.router.navigate([URL.Login]);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.isExpired(token) : false;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getToken(): string {
    return localStorage.getItem(this.ID_TOKEN) as string;
  }
}
