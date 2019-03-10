import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { ContentTypeManagerComponent } from './content-type-manager/content-type-manager.component';

import { dashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule],
  declarations: [DashboardLayoutComponent, ContentTypeManagerComponent],
})
export class DashboardModule { }
