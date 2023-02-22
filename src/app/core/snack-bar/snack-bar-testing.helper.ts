import { SnackBarService } from './snack-bar.service';

export class SnackbarServiceStub implements Partial<SnackBarService> {}

export const provideSnackbarServiceStub = {
  provide: SnackBarService,
  useClass: SnackbarServiceStub,
};
