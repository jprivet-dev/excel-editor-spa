import { TestBed } from '@angular/core/testing';

import { MusicGroupDataService } from './music-group-data.service';

describe('MusicGroupDataService', () => {
  let service: MusicGroupDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicGroupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
