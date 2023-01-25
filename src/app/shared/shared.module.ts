import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonLogoutComponent } from './button-logout/button-logout.component';
import { UserInfoComponent } from './user-info/user-info.component';

const components = [ButtonLogoutComponent, UserInfoComponent];
const modules = [NgbDatepickerModule];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ...modules],
  exports: [...components, ...modules, ReactiveFormsModule],
})
export class SharedModule {}
