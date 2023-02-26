import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any) {
    const errorService = this.injector.get(ErrorService);
    console.error(
      'GlobalErrorHandler | normalized error',
      errorService.normalizeError(error)
    );
    // It possible to log errors here.
  }
}
