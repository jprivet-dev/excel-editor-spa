import { Injectable } from '@angular/core';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  readonly isNotAuthenticated$ = this.isAuthenticated$.pipe(
    map((isAuthenticated) => !isAuthenticated)
  );

  private errorSubject = new ReplaySubject<Error>(1);
  readonly error$ = this.errorSubject.asObservable();

  applyIsAuthenticated(): void {
    this.isAuthenticatedSubject.next(true);
  }

  applyIsNotAuthenticated(): void {
    this.isAuthenticatedSubject.next(false);
  }

  setError(error: Error): void {
    this.errorSubject.next(error);
  }
}
