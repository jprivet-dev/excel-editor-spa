import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

const modules = [NgbDatepickerModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules, ReactiveFormsModule],
})
export class SharedModule {}
