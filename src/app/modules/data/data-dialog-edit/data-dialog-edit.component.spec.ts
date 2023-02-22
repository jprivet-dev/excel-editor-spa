import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataDialogEditComponent } from './data-dialog-edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DataDialogEditComponent', () => {
  let component: DataDialogEditComponent;
  let fixture: ComponentFixture<DataDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataDialogEditComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
