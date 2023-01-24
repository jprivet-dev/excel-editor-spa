import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { LoggedInGuard } from './logged-in.guard';
import { AuthServiceStub } from './unit-test.helper';

describe('LoggedInGuard', () => {
  let auth: AuthService;
  let guard: LoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useClass: AuthServiceStub }],
      imports: [RouterTestingModule],
    });

    auth = TestBed.inject(AuthService);
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('When user is authorized', () => {
    beforeEach(() => {
      spyOn(auth, 'isLoggedIn').and.returnValue(true);
    });

    it('should return true', () => {
      expect(guard.canActivate()).toBeTrue();
    });
  });

  describe('When user is NOT authorized', () => {
    beforeEach(() => {
      spyOn(auth, 'isLoggedIn').and.returnValue(false);
    });

    it('should return login url to redirect', () => {
      expect(guard.canActivate().toString()).toBe('/login');
    });
  });
});
