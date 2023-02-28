import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientError, ServerError, SymfonyHttpException } from './error.models';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  normalizeError(error: any): ServerError | ClientError {
    if (error instanceof HttpErrorResponse) {
      return this.serverError(error);
    } else if (error instanceof Error) {
      return this.clientError(error);
    }

    return {
      name: error?.name ?? 'unknown',
      message: error?.message ?? 'unknown',
    };
  }

  serverError(error: HttpErrorResponse): ServerError {
    const serverError: ServerError = {
      status: error.status,
      name: error.name,
      message: error.message,
    };

    error?.url && (serverError.url = error.url);

    const subError = error?.error ?? null;

    if (subError) {
      const symfonyHttpException = this.getSymfonyHttpException(subError);
      if (symfonyHttpException) {
        serverError.detail = symfonyHttpException.detail;
        serverError.exception = symfonyHttpException.class.split('\\').pop();
      } else if (subError?.message) {
        serverError.detail = subError.message;
      }
    }

    return serverError;
  }

  clientError(error: Error): ClientError {
    return {
      name: error.name,
      message: error.message,
    };
  }

  getSymfonyHttpException(subError: any): SymfonyHttpException | null {
    const isSymfonyException = subError?.class
      ? subError.class.startsWith('Symfony\\Component\\HttpKernel\\Exception')
      : false;

    return isSymfonyException ? (subError as SymfonyHttpException) : null;
  }
}
