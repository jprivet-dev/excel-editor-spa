import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NotAuthGuard } from '@core/auth';

const routes: Routes = [
  { path: '', redirectTo: 'data', pathMatch: 'full' },
  {
    path: 'data',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@modules/data/data.module').then((m) => m.DataModule),
  },
  {
    path: 'login',
    canActivate: [NotAuthGuard],
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
