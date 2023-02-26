import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User | null> {
  constructor(private auth: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User | null> {
    console.log('UserResolver | resolve() | Pending...');
    return this.auth.user$.pipe(
      tap((user) => console.log('UserResolver | resolve | user', user))
    );
  }
}
