import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MusicGroupDataFormComponent } from '@modules/data/smarts/music-group-data-form/music-group-data-form.component';
import { SharedModule } from '@shared/shared.module';
import { DataRoutingModule } from './data-routing.module';
import { DataComponent } from './data.component';
import { DataTableComponent } from './smarts/data-table/data-table.component';
import { MusicGroupDataModalComponent } from './smarts/music-group-data-modal/music-group-data-modal.component';
import { MusicGroupUploadComponent } from './smarts/music-group-upload/music-group-upload.component';

@NgModule({
  declarations: [
    DataComponent,
    MusicGroupUploadComponent,
    DataTableComponent,
    MusicGroupDataFormComponent,
    MusicGroupDataModalComponent,
  ],
  imports: [CommonModule, DataRoutingModule, SharedModule],
})
export class DataModule {}
