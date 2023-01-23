import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { LoggedOutGuard } from './logged-out.guard';
import { AuthServiceStub } from './unit-test.helper';

describe('LoggedOutGuard', () => {
  let auth: AuthService;
  let guard: LoggedOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useClass: AuthServiceStub }],
      imports: [RouterTestingModule],
    });

    auth = TestBed.inject(AuthService);
    guard = TestBed.inject(LoggedOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('When user is authorized', () => {
    beforeEach(() => {
      spyOn(auth, 'isLoggedOut').and.returnValue(true);
    });

    it('should return true', () => {
      expect(guard.canActivate()).toBeTrue();
    });
  });

  describe('When user is NOT authorized', () => {
    beforeEach(() => {
      spyOn(auth, 'isLoggedOut').and.returnValue(false);
    });

    it('should return login url to redirect', () => {
      expect(guard.canActivate().toString()).toBe('/');
    });
  });
});
