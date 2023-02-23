import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataComponent } from './data.component';
import { provideAuthServiceStub } from '@core/auth';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataComponent],
      providers: [provideAuthServiceStub],
    }).compileComponents();

    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
