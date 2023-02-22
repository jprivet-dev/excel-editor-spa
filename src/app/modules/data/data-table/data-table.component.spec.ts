import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideSnackbarServiceStub } from '@core/snack-bar';
import { DataTableComponent } from './data-table.component';
import { provideDataTableServiceStub } from './data-table-testing.helper';
import { provideMockAuthService } from '@core/auth';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [HttpClientTestingModule],
      providers: [
        provideMockAuthService,
        provideDataTableServiceStub,
        provideSnackbarServiceStub,
        { provide: MatDialog, useValue: {} },
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
