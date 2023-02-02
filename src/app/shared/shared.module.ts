import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { IsGrantedDirective } from './is-granted.directive';
import { MaterialModule } from './material.module';

const modules = [NgbDatepickerModule, MaterialModule];
const directives = [IsGrantedDirective];

@NgModule({
  declarations: [...directives],
  imports: [CommonModule, ...modules],
  exports: [...modules, ...directives, ReactiveFormsModule],
})
export class SharedModule {}
