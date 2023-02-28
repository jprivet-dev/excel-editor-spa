import { Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';

// @see https://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2/38620817#38620817
// @see https://angular.io/api/router/RouterEvent
@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(private router: Router) {
    this.navigationInterceptorInit();
  }

  start(): void {
    this.isLoadingSubject.next(true);
  }

  stop(): void {
    this.isLoadingSubject.next(false);
  }

  private navigationInterceptorInit(): void {
    this.router.events
      .pipe(
        filter(
          (event: any): event is RouterEvent => event instanceof RouterEvent
        ),
        tap((event) => this.indeterminateEvents(event))
      )
      .subscribe();
  }

  private indeterminateEvents(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.start();
      return;
    }

    if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.stop();
    }
  }
}
