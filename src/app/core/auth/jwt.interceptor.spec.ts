import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtInterceptor } from '@core/auth/jwt.interceptor';
import { AuthService } from './auth.service';
import { AuthServiceStub } from './auth-testing.helper';

describe('JwtInterceptor', () => {
  let interceptor: JwtInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useClass: AuthServiceStub }],
      imports: [RouterTestingModule],
    });
    interceptor = TestBed.inject(JwtInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
