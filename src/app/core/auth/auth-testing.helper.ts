import { AuthService } from './auth.service';

export class AuthServiceStub implements Partial<AuthService> {}

export const provideAuthServiceStub = {
  provide: AuthService,
  useClass: AuthServiceStub,
};
