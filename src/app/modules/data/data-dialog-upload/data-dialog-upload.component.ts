import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-dialog-upload',
  templateUrl: './data-dialog-upload.component.html',
  styleUrls: ['./data-dialog-upload.component.scss'],
})
export class DataDialogUploadComponent {
  constructor(public dialogRef: MatDialogRef<DataDialogUploadComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
