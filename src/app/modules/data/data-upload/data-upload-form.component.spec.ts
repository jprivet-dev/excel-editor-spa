import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUploadFormComponent } from './data-upload-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DataUploadFormComponent', () => {
  let component: DataUploadFormComponent;
  let fixture: ComponentFixture<DataUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataUploadFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DataUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
