import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IsGrantedDirective } from '@core/auth';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, IsGrantedDirective],
  exports: [MaterialModule, IsGrantedDirective, ReactiveFormsModule],
})
export class SharedModule {}
