import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataToolbarComponent } from './data-toolbar.component';
import { provideAuthServiceStub } from '@core/auth';
import { MaterialModule } from '@shared/material.module';

describe('DataToolbarComponent', () => {
  let component: DataToolbarComponent;
  let fixture: ComponentFixture<DataToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataToolbarComponent],
      imports: [MaterialModule],
      providers: [provideAuthServiceStub],
    }).compileComponents();

    fixture = TestBed.createComponent(DataToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
