import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
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
  @Input() invalidMessage: string | null = null;
  @Output() fileSelectedEvent = new EventEmitter<File>();
  disabled: boolean = true;
  file!: File;

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.disabled = target.files === null;

    if (target.files) {
      this.file = target.files[0];
    }
  }

  submit(): void {
    this.reset();
    this.fileSelectedEvent.emit(this.file);
  }

  private reset() {
    this.fileUpload.nativeElement.value = '';
    this.disabled = true;
  }
}
