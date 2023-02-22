import { TestBed } from '@angular/core/testing';
import { SnackBarService } from './snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: {} }],
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
