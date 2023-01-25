import { AuthService } from './auth.service';

export class AuthServiceStub implements Partial<AuthService> {
  isLoggedIn(): boolean {
    return true;
  }
  isLoggedOut(): boolean {
    return true;
  }
}
