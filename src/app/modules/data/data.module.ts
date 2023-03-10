import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DataDialogEditComponent } from './data-dialog-edit';
import { DataDialogUploadComponent } from './data-dialog-upload';
import { DataFormComponent } from './data-form';
import { DataRoutingModule } from './data-routing.module';
import { DataTableComponent } from './data-table';
import { DataToolbarComponent } from './data-toolbar';
import { DataUploadComponent, DataUploadFormComponent } from './data-upload';
import { DataComponent } from './data.component';
import { DataDialogDeleteComponent } from './data-dialog-delete';

@NgModule({
  declarations: [
    DataComponent,
    DataDialogDeleteComponent,
    DataDialogEditComponent,
    DataDialogUploadComponent,
    DataFormComponent,
    DataTableComponent,
    DataToolbarComponent,
    DataUploadComponent,
    DataUploadFormComponent,
  ],
  imports: [CommonModule, SharedModule, DataRoutingModule],
})
export class DataModule {}
