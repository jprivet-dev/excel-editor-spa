import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DataFormComponent } from './data-form/data-form.component';
import { DataModalComponent } from './data-modal/data-modal.component';
import { DataRoutingModule } from './data-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { DataUploadFormComponent } from './data-upload/data-upload-form.component';
import { DataUploadComponent } from './data-upload/data-upload.component';
import { DataComponent } from './data.component';
import { DataToolbarComponent } from './data-toolbar/data-toolbar.component';

@NgModule({
  declarations: [
    DataComponent,
    DataUploadComponent,
    DataUploadFormComponent,
    DataTableComponent,
    DataFormComponent,
    DataModalComponent,
    DataToolbarComponent,
  ],
  imports: [CommonModule, DataRoutingModule, SharedModule],
})
export class DataModule {}
