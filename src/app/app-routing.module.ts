import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '@core/auth/logged-in.guard';
import { LoggedOutGuard } from '@core/auth/logged-out.guard';

const routes: Routes = [
  { path: '', redirectTo: 'data', pathMatch: 'full' },
  {
    path: 'data',
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
  { path: '**', redirectTo: 'data' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
