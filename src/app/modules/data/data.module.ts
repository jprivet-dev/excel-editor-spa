import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DataDialogEditComponent } from './data-dialog-edit/data-dialog-edit.component';
import { DataDialogUploadComponent } from './data-dialog-upload/data-dialog-upload.component';
import { DataFormComponent } from './data-form/data-form.component';
import { DataRoutingModule } from './data-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { DataToolbarComponent } from './data-toolbar/data-toolbar.component';
import { DataUploadFormComponent } from './data-upload/data-upload-form.component';
import { DataUploadComponent } from './data-upload/data-upload.component';
import { DataComponent } from './data.component';

@NgModule({
  declarations: [
    DataComponent,
    DataDialogEditComponent,
    DataFormComponent,
    DataTableComponent,
    DataToolbarComponent,
    DataUploadComponent,
    DataUploadFormComponent,
    DataDialogUploadComponent,
  ],
  imports: [CommonModule, SharedModule, DataRoutingModule],
})
export class DataModule {}
