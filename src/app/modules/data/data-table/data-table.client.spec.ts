import { TestBed } from '@angular/core/testing';

import { DataTableClient } from './data-table.client';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataTableClient', () => {
  let service: DataTableClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataTableClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
