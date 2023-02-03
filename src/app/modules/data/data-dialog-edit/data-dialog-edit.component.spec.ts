import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDialogEditComponent } from './data-dialog-edit.component';

describe('DataDialogEditComponent', () => {
  let component: DataDialogEditComponent;
  let fixture: ComponentFixture<DataDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDialogEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
