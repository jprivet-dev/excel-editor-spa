import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarService, SnackbarServiceStub } from '@core/snack-bar';
import { DataTableService } from '../data-table/data-table.service';
import { DataTableServiceStub } from '../data-table/unit-test.helper';
import { DataFormComponent } from './data-form.component';

describe('DataFormComponent', () => {
  let component: DataFormComponent;
  let fixture: ComponentFixture<DataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DataFormComponent],
      providers: [
        { provide: DataTableService, useClass: DataTableServiceStub },
        { provide: SnackBarService, useClass: SnackbarServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
