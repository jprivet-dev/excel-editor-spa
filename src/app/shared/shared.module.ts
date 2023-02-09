import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IsGrantedDirective } from '@core/auth';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';

const modules = [NgbDatepickerModule, MaterialModule];
const directives = [IsGrantedDirective];

@NgModule({
  imports: [CommonModule, ...modules, ...directives],
  exports: [...modules, ...directives, ReactiveFormsModule],
})
export class SharedModule {}
