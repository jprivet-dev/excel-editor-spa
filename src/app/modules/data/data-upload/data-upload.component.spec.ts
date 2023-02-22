import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackBarService, SnackbarServiceStub } from '@core/snack-bar';
import { DataUploadComponent } from '@modules/data/data-upload/data-upload.component';
import { DataUploadFormComponent } from '@modules/data/data-upload/data-upload-form.component';
import { DataUploadService } from '@modules/data/data-upload/data-upload.service';
import { DataUploadServiceStub } from '@modules/data/data-upload/data-upload-testing.helper';
import { DataTableService } from '@modules/data/data-table/data-table.service';
import { DataTableServiceStub } from '@modules/data/data-table/data-table-testing.helper';

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
