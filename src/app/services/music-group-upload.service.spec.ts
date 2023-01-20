import { TestBed } from '@angular/core/testing';

import { MusicGroupUploadService } from './music-group-upload.service';

describe('MusicGroupUploadService', () => {
  let service: MusicGroupUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicGroupUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
