import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'music-groups',
    loadChildren: () =>
      import('@containers/music-group/music-group.module').then(
        (m) => m.MusicGroupModule
      ),
  },
  { path: '', redirectTo: 'music-groups', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
