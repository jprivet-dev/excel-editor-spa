import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@shared/models';

@Component({
  selector: 'app-data-dialog-edit',
  templateUrl: './data-dialog-edit.component.html',
})
export class DataDialogEditComponent {
  constructor(
    public dialogRef: MatDialogRef<DataDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { data: Data | null }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
