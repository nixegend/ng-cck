import { Routes } from '@angular/router';

import { ProductTypeManagerComponent } from './product-type-manager/product-type-manager.component';

import { AuthGuard } from '../auth/auth.guard';
import { UserRoles } from '../common/user-roles';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: ProductTypeManagerComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.ADMIN] }
  }
];
