import { Routes } from '@angular/router';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { ContentTypeManagerComponent } from './content-type-manager/content-type-manager.component';

// import { AuthGuard } from '../auth/auth.guard';
// import { UserRoles } from '../common/user-roles';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [{
      path: 'content-types-manager',
      component: ContentTypeManagerComponent,
    }]
    // canActivate: [AuthGuard],
    // data: { roles: [UserRoles.OWNER] },
  },
];
