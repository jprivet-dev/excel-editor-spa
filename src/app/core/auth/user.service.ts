import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/user`)
      .pipe(tap((user) => this.setCurrentUser(user)));
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }
}
