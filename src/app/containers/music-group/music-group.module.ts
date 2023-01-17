import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicGroupRoutingModule } from './music-group-routing.module';
import { MusicGroupComponent } from './music-group.component';
import { MusicGroupUploadComponent } from './smarts/music-group-upload/music-group-upload.component';
import { SharedModule } from '@shared/shared.module';
import { MusicGroupDataComponent } from './smarts/music-group-data/music-group-data.component';
import { MusicGroupDataFormComponent } from '@containers/music-group/smarts/music-group-data-form/music-group-data-form.component';
import { MusicGroupDataModalComponent } from './smarts/music-group-data-modal/music-group-data-modal.component';

@NgModule({
  declarations: [
    MusicGroupComponent,
    MusicGroupUploadComponent,
    MusicGroupDataComponent,
    MusicGroupDataFormComponent,
    MusicGroupDataModalComponent,
  ],
  imports: [CommonModule, MusicGroupRoutingModule, SharedModule],
})
export class MusicGroupModule {}
