import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicGroupFileUploadFormComponent } from './presentationals/music-group-file-upload-form/music-group-file-upload-form.component';
import { ToastsComponent } from './smarts/toasts/toasts.component';
import {
  NgbDatepickerModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MusicGroupFileUploadFormComponent, ToastsComponent],
  imports: [CommonModule, NgbToastModule, NgbDatepickerModule],
  exports: [
    MusicGroupFileUploadFormComponent,
    ToastsComponent,
    NgbDatepickerModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
