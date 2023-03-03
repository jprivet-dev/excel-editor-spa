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
  readonly token$ = this.tokenSubject.asObservable();

  readonly isAuthenticated$ = this.token$.pipe(map((token) => !!token));
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
    this.storage.setToken(token);
    this.tokenSubject.next(token);
  }

  getToken(): Token {
    return this.tokenSubject.getValue();
  }

  retrieveToken(): void {
    this.setToken(this.storage.getToken());
  }

  setUser(user: User | null): void {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.getValue();
  }

  userExists(): boolean {
    return this.userSubject.getValue() !== null;
  }

  setError(error: Error): void {
    this.errorSubject.next(error);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }

  logout(): void {
    this.setToken(null);
    this.setUser(null);
  }
}
