import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@core/auth';
import { User } from '@core/auth/models';
import { Observable, of } from 'rxjs';
import { UserInfoComponent } from './user-info.component';

class UserServiceStub implements Partial<UserService> {
  getCurrentUser(): Observable<User> {
    return of();
  }
}

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
