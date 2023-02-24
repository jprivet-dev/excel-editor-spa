import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@shared/models';

@Component({
  selector: 'app-data-dialog-edit',
  templateUrl: './data-dialog-edit.component.html',
})
export class DataDialogEditComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: { data: Data | null }
  ) {}
}
