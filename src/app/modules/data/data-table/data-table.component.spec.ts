import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackBarService, SnackbarServiceStub } from '@core/snack-bar';
import { DataTableComponent } from './data-table.component';
import { DataTableService } from './data-table.service';
import { DataTableServiceStub } from './data-table-testing.helper';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      providers: [
        { provide: DataTableService, useClass: DataTableServiceStub },
        { provide: SnackBarService, useClass: SnackbarServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
