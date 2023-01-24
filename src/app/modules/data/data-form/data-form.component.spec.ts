import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '@core/toasts';
import { DataTableService } from '../data-table/data-table.service';
import { DataFormComponent } from './data-form.component';

class DataTableServiceStub implements Partial<DataTableService> {}
class ToastServiceStub implements Partial<ToastService> {}

describe('DataFormComponent', () => {
  let component: DataFormComponent;
  let fixture: ComponentFixture<DataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DataFormComponent],
      providers: [
        { provide: DataTableService, useClass: DataTableServiceStub },
        { provide: ToastService, useClass: ToastServiceStub },
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
