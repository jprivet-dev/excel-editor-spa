import { ProgressBarService } from './progress-bar.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export class ProgressBarServiceStub implements Partial<ProgressBarService> {}

export const provideProgressBarServiceStub = {
  provide: ProgressBarService,
  useClass: ProgressBarServiceStub,
};

@Injectable()
class MockProgressBarService extends ProgressBarService {
  override isLoading$ = of(false);
}

export const provideMockProgressBarService = {
  provide: ProgressBarService,
  useClass: MockProgressBarService,
};
