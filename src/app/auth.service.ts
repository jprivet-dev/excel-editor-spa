import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user';
import { environment } from '@environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/login_check`, {
        username,
        password,
      })
      .pipe(
        tap((user) => this.setToken(user)),
        shareReplay()
      );
  }

  private setToken(user: User) {
    localStorage.setItem('id_token', user.token);
  }

  private removeToken() {
    localStorage.removeItem('id_token');
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
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.isExpired(token) : false;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getToken(): string {
    return localStorage.getItem('id_token') as string;
  }
}
