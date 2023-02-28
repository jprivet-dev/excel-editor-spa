import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { NotAuthGuard } from './not-auth.guard';
import { provideAuthServiceStub } from './auth-testing.helper';

describe('NotAuthGuard', () => {
  let auth: AuthService;
  let guard: NotAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAuthServiceStub],
      imports: [RouterTestingModule],
    });

    auth = TestBed.inject(AuthService);
    guard = TestBed.inject(NotAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // TODO: to update
  // describe('When user is authorized', () => {
  //   beforeEach(() => {
  //     spyOn(auth, 'isLoggedOut').and.returnValue(true);
  //   });
  //
  //   it('should return true', () => {
  //     expect(guard.canActivate()).toBeTrue();
  //   });
  // });
  //
  // describe('When user is NOT authorized', () => {
  //   beforeEach(() => {
  //     spyOn(auth, 'isLoggedOut').and.returnValue(false);
  //   });
  //
  //   it('should return login url to redirect', () => {
  //     expect(guard.canActivate().toString()).toBe('/');
  //   });
  // });
});
