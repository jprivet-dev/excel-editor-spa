import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataDialogUploadComponent } from './data-dialog-upload.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('DataDialogUploadComponent', () => {
  let component: DataDialogUploadComponent;
  let fixture: ComponentFixture<DataDialogUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataDialogUploadComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(DataDialogUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
