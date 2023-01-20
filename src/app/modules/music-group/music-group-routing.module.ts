import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicGroupComponent } from './music-group.component';

const routes: Routes = [
  {
    path: '',
    component: MusicGroupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicGroupRoutingModule {}
