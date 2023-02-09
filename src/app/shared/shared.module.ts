import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IsGrantedDirective } from '@core/auth';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [CommonModule, IsGrantedDirective],
  exports: [
    RouterModule,
    MaterialModule,
    IsGrantedDirective,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
