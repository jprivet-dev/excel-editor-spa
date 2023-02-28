import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataDialogDeleteComponent } from './data-dialog-delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '@shared/material.module';
import { testDataGroupeA } from '@shared/shared-testing.helper';

describe('DataDialogDeleteComponent', () => {
  let component: DataDialogDeleteComponent;
  let fixture: ComponentFixture<DataDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataDialogDeleteComponent],
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { data: testDataGroupeA } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DataDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
