import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonLogoutComponent } from './button-logout/button-logout.component';
import { IsGrantedDirective } from './is-granted.directive';
import { MaterialModule } from './material.module';
import { UserInfoComponent } from './user-info/user-info.component';

const components = [ButtonLogoutComponent, UserInfoComponent];
const modules = [NgbDatepickerModule, MaterialModule];
const directives = [IsGrantedDirective];

@NgModule({
  declarations: [...components, ...directives],
  imports: [CommonModule, ...modules],
  exports: [...components, ...modules, ...directives, ReactiveFormsModule],
})
export class SharedModule {}
