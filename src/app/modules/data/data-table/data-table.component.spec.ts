import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from '@core/toasts';
import { DataTableComponent } from './data-table.component';
import { DataTableService } from './data-table.service';

class DataTableServiceStub implements Partial<DataTableService> {}
class ToastServiceStub implements Partial<ToastService> {}

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      providers: [
        { provide: DataTableService, useClass: DataTableServiceStub },
        { provide: ToastService, useClass: ToastServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
