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

  authenticated(): void {
    this.isAuthenticatedSubject.next(true);
  }

  notAuthenticated(): void {
    this.isAuthenticatedSubject.next(false);
  }

  setError(error: Error): void {
    this.errorSubject.next(error);
  }

  clear(): void {
    this.notAuthenticated();
  }
}
