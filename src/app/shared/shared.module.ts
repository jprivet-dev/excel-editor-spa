import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MusicGroupFileUploadFormComponent } from './presentationals/music-group-file-upload-form/music-group-file-upload-form.component';

@NgModule({
  declarations: [MusicGroupFileUploadFormComponent],
  imports: [CommonModule, NgbDatepickerModule],
  exports: [
    MusicGroupFileUploadFormComponent,
    NgbDatepickerModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
