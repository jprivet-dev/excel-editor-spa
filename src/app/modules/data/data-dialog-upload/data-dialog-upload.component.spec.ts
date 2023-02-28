import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataDialogUploadComponent } from './data-dialog-upload.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DataDialogUploadComponent', () => {
  let component: DataDialogUploadComponent;
  let fixture: ComponentFixture<DataDialogUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataDialogUploadComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DataDialogUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
