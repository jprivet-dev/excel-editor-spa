import { isDevMode } from '@angular/core';

export const consoleDevMode = {
  log: (...data: any[]): void => {
    isDevMode() && console.log(...data);
  },
  error: (...data: any[]): void => {
    isDevMode() && console.error(...data);
  },
};
