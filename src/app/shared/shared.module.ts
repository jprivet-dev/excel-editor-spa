import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MusicGroupFileUploadFormComponent } from './presentationals/music-group-file-upload-form/music-group-file-upload-form.component';

const components = [MusicGroupFileUploadFormComponent];
const modules = [NgbDatepickerModule];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ...modules],
  exports: [...components, ...modules, ReactiveFormsModule],
})
export class SharedModule {}
