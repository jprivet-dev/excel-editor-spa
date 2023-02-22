import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackBarService, SnackbarServiceStub } from '@core/snack-bar';
import { DataUploadComponent } from './data-upload.component';
import { DataUploadFormComponent } from './data-upload-form.component';
import { DataUploadService } from './data-upload.service';
import { DataUploadServiceStub } from './data-upload-testing.helper';
import { DataTableService } from '../data-table/data-table.service';
import { DataTableServiceStub } from '../data-table';

describe('DataUploadComponent', () => {
  let component: DataUploadComponent;
  let fixture: ComponentFixture<DataUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataUploadComponent, DataUploadFormComponent],
      providers: [
        { provide: DataUploadService, useClass: DataUploadServiceStub },
        { provide: DataTableService, useClass: DataTableServiceStub },
        { provide: SnackBarService, useClass: SnackbarServiceStub },
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
