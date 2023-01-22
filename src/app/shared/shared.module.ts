import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonLogoutComponent } from './button-logout/button-logout.component';

const modules = [NgbDatepickerModule];

@NgModule({
  declarations: [ButtonLogoutComponent],
  imports: [CommonModule, ...modules],
  exports: [...modules, ReactiveFormsModule, ButtonLogoutComponent],
})
export class SharedModule {}
