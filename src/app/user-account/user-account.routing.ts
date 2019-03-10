import { Routes } from '@angular/router';

import { AccountLayoutComponent } from './account-layout/account-layout.component';

// import { AuthGuard } from '../auth/auth.guard';
// import { UserRoles } from '../common/user-roles';

export const userAccountRoutes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    // canActivate: [AuthGuard],
    // data: { roles: [UserRoles.OWNER] },
  },
];
