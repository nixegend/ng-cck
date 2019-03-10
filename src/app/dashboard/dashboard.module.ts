import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatSidenavModule, MatTabsModule, MatListModule } from '@angular/material';
import { dashboardRoutes } from './dashboard.routing';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { ContentTypeManagerComponent } from './content-type-manager/content-type-manager.component';
import { ContentTypeEditorComponent } from './content-type-editor/content-type-editor.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    MatDialogModule,
    MatSidenavModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule],
  declarations: [DashboardLayoutComponent, ContentTypeManagerComponent, ContentTypeEditorComponent],
  entryComponents: [ContentTypeEditorComponent],
})
export class DashboardModule { }
