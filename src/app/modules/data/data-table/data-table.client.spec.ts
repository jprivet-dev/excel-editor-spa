import { TestBed } from '@angular/core/testing';

import { DataTableClient } from './data-table.client';

describe('DataTableClient', () => {
  let service: DataTableClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTableClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
