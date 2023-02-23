import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideSnackbarServiceStub } from '@core/snack-bar';
import { DataFormComponent } from './data-form.component';
import { provideDataTableServiceStub } from '@modules/data/data-table/data-table-testing.helper';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DataFormComponent', () => {
  let component: DataFormComponent;
  let fixture: ComponentFixture<DataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DataFormComponent],
      providers: [provideDataTableServiceStub, provideSnackbarServiceStub],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
