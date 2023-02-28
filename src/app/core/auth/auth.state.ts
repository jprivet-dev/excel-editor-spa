import { Injectable } from '@angular/core';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';
import { AuthStorage } from './auth.storage';
import { Token, User } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoadingSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();

  private tokenSubject = new BehaviorSubject<Token>(null);

  readonly isAuthenticated$ = this.user$.pipe(map((user) => user !== null));
  readonly isNotAuthenticated$ = this.isAuthenticated$.pipe(
    map((isAuthenticated) => !isAuthenticated)
  );

  private errorSubject = new ReplaySubject<Error | null>(1);
  readonly error$ = this.errorSubject.asObservable();

  constructor(private storage: AuthStorage) {}

  startLoading(): void {
    this.isLoadingSubject.next(true);
  }

  stopLoading(): void {
    this.isLoadingSubject.next(false);
  }

  setToken(token: Token): void {
    if (token) {
      this.storage.setToken(token);
      this.tokenSubject.next(token);
    } else {
      this.storage.removeToken();
      this.tokenSubject.next(null);
    }
  }

  getToken(): Token {
    return this.tokenSubject.getValue();
  }

  removeToken(): void {
    this.storage.removeToken();
    this.tokenSubject.next('');
  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  removeUser(): void {
    this.userSubject.next(null);
  }

  setError(error: Error): void {
    this.errorSubject.next(error);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }

  logout(): void {
    this.removeToken();
    this.removeUser();
  }
}
