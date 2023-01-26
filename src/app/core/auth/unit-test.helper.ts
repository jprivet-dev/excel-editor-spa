import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

export class AuthServiceStub implements Partial<AuthService> {
  isLoggedIn(): boolean {
    return true;
  }
  isLoggedOut(): boolean {
    return true;
  }
}

export class UserServiceStub implements Partial<UserService> {
  retrieveUser() {
    return of();
  }
}
