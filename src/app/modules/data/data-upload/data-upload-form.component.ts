import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-data-upload-form',
  templateUrl: './data-upload-form.component.html',
  styleUrls: ['./data-upload-form.component.scss'],
})
export class DataUploadFormComponent {
  @ViewChild('fileUpload') fileUpload!: ElementRef;
  @Output() fileSelectedEvent = new EventEmitter<File>();
  @Output() submitEvent = new EventEmitter<File>();

  disabled: boolean = true;
  file!: File;

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.disabled = target.files === null;

    if (target.files) {
      this.file = target.files[0];
      this.fileSelectedEvent.emit(this.file);
    }
  }

  submit(): void {
    this.reset();
    this.submitEvent.emit(this.file);
  }

  private reset() {
    this.fileUpload.nativeElement.value = '';
    this.disabled = true;
  }
}
