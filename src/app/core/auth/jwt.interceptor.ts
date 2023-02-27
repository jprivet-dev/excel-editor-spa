import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * The JwtInterceptor retrieve and inject the token in the header.
 * It the API returns an error because of an invalid token,
 * then the JwtInterceptor triggers the logout.
 */
@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.auth.token$.pipe(
      tap((token) =>
        console.log(
          'JwtInterceptor | intercept() | token',
          typeof token === 'string' ? token.substring(0, 10) + '...' : token
        )
      ),
      switchMap((token) => {
        if (token === null) {
          return next.handle(request);
        }

        const clone = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next
          .handle(clone)
          .pipe(catchError((error: any) => this.handleError(error)));
      })
    );
  }

  private handleError(error: any): Observable<never> {
    if (
      error instanceof HttpErrorResponse &&
      error.status === HttpStatusCode.Unauthorized
    ) {
      this.auth.logout();
    }

    return throwError(error);
  }
}
