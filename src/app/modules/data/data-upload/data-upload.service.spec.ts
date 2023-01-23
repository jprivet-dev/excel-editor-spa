import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataUploadService } from './data-upload.service';

describe('DataUploadService', () => {
  let service: DataUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
