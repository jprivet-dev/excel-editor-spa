import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService, UserServiceStub } from '@core/auth';
import { DataComponent } from './data.component';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataComponent],
      providers: [{ provide: UserService, useClass: UserServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
