import { TestBed } from '@angular/core/testing';

import { DataTableState } from './data-table.state';

describe('DataTableState', () => {
  let service: DataTableState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTableState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
