import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const modules = [NgbModule];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules],
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
