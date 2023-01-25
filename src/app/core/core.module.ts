import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { IsGrantedDirective } from './auth';
import { ToastsComponent } from './toasts';

const components = [ToastsComponent, IsGrantedDirective];
const modules = [NgbToastModule, NgbModule];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ...modules],
  exports: [...components, ...modules],
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
