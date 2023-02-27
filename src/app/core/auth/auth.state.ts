import { Injectable } from '@angular/core';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoadingSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  readonly isNotAuthenticated$ = this.isAuthenticated$.pipe(
    map((isAuthenticated) => !isAuthenticated)
  );

  private errorSubject = new ReplaySubject<Error | null>(1);
  readonly error$ = this.errorSubject.asObservable();

  startLoading(): void {
    this.isLoadingSubject.next(true);
  }

  stopLoading(): void {
    this.isLoadingSubject.next(false);
  }

  authenticated(): void {
    console.log('****** AuthState | authenticated()');
    this.isAuthenticatedSubject.next(true);
  }

  notAuthenticated(): void {
    console.log('***** AuthState | notAuthenticated()');
    this.isAuthenticatedSubject.next(false);
  }

  setError(error: Error): void {
    this.errorSubject.next(error);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
