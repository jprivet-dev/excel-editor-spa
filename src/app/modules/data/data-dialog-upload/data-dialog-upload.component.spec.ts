import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDialogUploadComponent } from './data-dialog-upload.component';

describe('DataDialogUploadComponent', () => {
  let component: DataDialogUploadComponent;
  let fixture: ComponentFixture<DataDialogUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDialogUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDialogUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
