import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthServiceStub } from './auth-testing.helper';

describe('AuthGuard', () => {
  let auth: AuthService;
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useClass: AuthServiceStub }],
      imports: [RouterTestingModule],
    });

    auth = TestBed.inject(AuthService);
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // TODO: to update
  // describe('When user is authorized', () => {
  //   beforeEach(() => {
  //     spyOn(auth, 'isLoggedIn').and.returnValue(true);
  //   });
  //
  //   it('should return true', () => {
  //     expect(guard.canActivate()).toBeTrue();
  //   });
  // });
  //
  // describe('When user is NOT authorized', () => {
  //   beforeEach(() => {
  //     spyOn(auth, 'isLoggedIn').and.returnValue(false);
  //   });
  //
  //   it('should return login url to redirect', () => {
  //     expect(guard.canActivate().toString()).toBe('/login');
  //   });
  // });
});
