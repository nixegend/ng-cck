import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

// import { AuthGuard } from './auth/auth.guard';
// import { UserRoles } from './common/user-roles';

export const routing: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'account',
    loadChildren: './user-account/user-account.module#UserAccountModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
