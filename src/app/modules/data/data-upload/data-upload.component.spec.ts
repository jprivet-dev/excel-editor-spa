import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from '@core/toasts';
import { Observable, of } from 'rxjs';
import { DataTable } from '../data-table/data-table.model';
import { DataTableService } from '../data-table/data-table.service';
import { DataUploadComponent } from './data-upload.component';
import { DataUploadService } from './data-upload.service';

class DataUploadServiceStub implements Partial<DataUploadService> {}
class DataTableServiceStub implements Partial<DataTableService> {
  load(): Observable<DataTable[]> {
    return of([]);
  }
}
class ToastServiceStub implements Partial<ToastService> {}

describe('DataUploadComponent', () => {
  let component: DataUploadComponent;
  let fixture: ComponentFixture<DataUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataUploadComponent],
      providers: [
        { provide: DataUploadService, useClass: DataUploadServiceStub },
        { provide: DataTableService, useClass: DataTableServiceStub },
        { provide: ToastService, useClass: ToastServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
