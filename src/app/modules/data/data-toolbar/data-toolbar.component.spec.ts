import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataToolbarComponent } from './data-toolbar.component';
import { provideAuthServiceStub } from '@core/auth';
import { MaterialModule } from '@shared/material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DataToolbarComponent', () => {
  let component: DataToolbarComponent;
  let fixture: ComponentFixture<DataToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataToolbarComponent],
      imports: [MaterialModule],
      providers: [provideAuthServiceStub],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DataToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
