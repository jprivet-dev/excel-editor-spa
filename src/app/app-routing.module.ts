import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NotAuthGuard } from '@core/auth';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UserResolver } from '@core/auth/user.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'data', pathMatch: 'full' },
  {
    path: 'data',
    canActivate: [AuthGuard],
    resolve: { user: UserResolver }, // We wait until we have the user before triggering the display of the page.
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
