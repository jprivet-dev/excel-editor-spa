import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackBarService, SnackbarServiceStub } from '@shared/snack-bar';
import { DataTableService } from '../data-table/data-table.service';
import { DataTableServiceStub } from '../data-table/unit-test.helper';
import { DataUploadFormComponent } from './data-upload-form.component';
import { DataUploadComponent } from './data-upload.component';
import { DataUploadService } from './data-upload.service';
import { DataUploadServiceStub } from './unit-test.helper';

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
