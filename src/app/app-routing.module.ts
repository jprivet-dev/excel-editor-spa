import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NotAuthGuard } from '@core/auth';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

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
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
