import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-dialog-edit',
  templateUrl: './data-dialog-edit.component.html',
  styleUrls: ['./data-dialog-edit.component.scss'],
})
export class DataDialogEditComponent {
  constructor(
    public dialogRef: MatDialogRef<DataDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { id: number }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
