import { ErrorHandler, Injectable } from '@angular/core';
import { consoleDevMode } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    consoleDevMode.error('GlobalErrorHandler | error', error);
    // It possible to log errors here.
  }
}
