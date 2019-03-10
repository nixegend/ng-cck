import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { AccountLayoutComponent } from './account-layout/account-layout.component';

import { userAccountRoutes } from './user-account.routing';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule.forChild(userAccountRoutes)
  ],
  exports: [RouterModule],
  declarations: [AccountLayoutComponent]
})
export class UserAccountModule { }
