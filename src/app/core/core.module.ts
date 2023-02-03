import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const modules = [NgbModule, MatSnackBarModule];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'Core is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
