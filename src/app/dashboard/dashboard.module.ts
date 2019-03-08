import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductTypeManagerComponent } from './product-type-manager/product-type-manager.component';
import { dashboardRoutes } from './dashboard.routing';

@NgModule({
  declarations: [ProductTypeManagerComponent],
  imports: [
    MatTabsModule,
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
