import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { consoleDevMode } from '../utils';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any) {
    const errorService = this.injector.get(ErrorService);
    consoleDevMode.error(
      'GlobalErrorHandler | normalized error',
      errorService.normalizeError(error)
    );
    // It possible to log errors here.
  }
}
