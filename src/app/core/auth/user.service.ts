import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, of, shareReplay, tap } from 'rxjs';
import { Roles, User } from './models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user`).pipe(
      tap((user) => this.setUser(user)),
      shareReplay()
    );
  }

  retrieveUser(): Observable<User> {
    const user = this.userSubject.value;
    return user ? of(user) : this.getUser();
  }

  setUser(user: User | null): void {
    this.userSubject.next(user);
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  hasRole(role: Roles): boolean {
    const user = this.userSubject.value;
    return user ? user.roles.includes(role as never) : false;
  }
}
