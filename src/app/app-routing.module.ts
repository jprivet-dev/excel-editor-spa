import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '@app/logged-in.guard';
import { LoggedOutGuard } from '@app/logged-out.guard';

const routes: Routes = [
  { path: '', redirectTo: 'music-groups', pathMatch: 'full' },
  {
    path: 'music-groups',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('@modules/data/data.module').then((m) => m.DataModule),
  },
  {
    path: 'login',
    canActivate: [LoggedOutGuard],
    loadChildren: () =>
      import('@modules/login/login.module').then((m) => m.LoginModule),
  },
  { path: '**', redirectTo: 'music-groups' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
