import { AuthService } from './auth.service';
import { User } from './auth.models';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export class AuthServiceStub implements Partial<AuthService> {}

export const provideAuthServiceStub = {
  provide: AuthService,
  useClass: AuthServiceStub,
};

const admin: User = {
  email: 'admin@email.com',
  username: 'Admin',
  roles: ['ROLE_ADMIN'],
};

@Injectable()
class MockAuthService extends AuthService {
  override user$ = of(admin);
  override isLoading$ = of(false);
}

export const provideMockAuthService = {
  provide: AuthService,
  useClass: MockAuthService,
};
