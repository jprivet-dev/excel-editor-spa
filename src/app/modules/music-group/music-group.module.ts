import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MusicGroupDataFormComponent } from '@modules/music-group/smarts/music-group-data-form/music-group-data-form.component';
import { SharedModule } from '@shared/shared.module';
import { MusicGroupRoutingModule } from './music-group-routing.module';
import { MusicGroupComponent } from './music-group.component';
import { MusicGroupDataModalComponent } from './smarts/music-group-data-modal/music-group-data-modal.component';
import { MusicGroupDataComponent } from './smarts/music-group-data/music-group-data.component';
import { MusicGroupUploadComponent } from './smarts/music-group-upload/music-group-upload.component';

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
