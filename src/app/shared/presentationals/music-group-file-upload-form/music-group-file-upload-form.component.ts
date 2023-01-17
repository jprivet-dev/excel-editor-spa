import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-music-group-file-upload-form',
  templateUrl: './music-group-file-upload-form.component.html',
  styleUrls: ['./music-group-file-upload-form.component.scss'],
})
export class MusicGroupFileUploadFormComponent {
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

  onSubmit(): void {
    this.reset();
    this.fileSelectedEvent.emit(this.file);
  }

  private reset() {
    this.fileUpload.nativeElement.value = '';
    this.disabled = true;
  }
}
