import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { TestPageComponent } from './test-page/test-page.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { AuthGuard } from './auth/auth.guard';
import { UserRoles } from './common/user-roles';

export const routing: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.ADMIN] }
  },
  {
    path: 'test',
    component: TestPageComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
