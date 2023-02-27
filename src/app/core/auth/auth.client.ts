import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';
import { Credentials, LoginCheck, User } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  constructor(private http: HttpClient) {}

  getToken(credentials: Credentials): Observable<string> {
    console.log('AuthClient | getToken()');
    return this.http
      .post<LoginCheck>(`${environment.apiUrl}/login_check`, credentials)
      .pipe(map((loginCheck) => loginCheck.token));
  }

  getUser(): Observable<User> {
    console.log('AuthClient | getUser()');
    return this.http.get<User>(`${environment.apiUrl}/user`);
  }
}
