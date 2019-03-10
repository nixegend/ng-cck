import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { UserRolesTypes, UserRoles } from '../common/user-roles';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

import { getCurrentUserRole } from '../auth/ngrx/selectors';
import { IMainReducerState } from '../app.reducers';
import { selectFeatureCount } from './ngrx/selectors';

import { StartLoadCurrentUserInfo, ResetCurrentUser } from '../auth/ngrx/actions';

@Component({
  selector: '.app-root-container',
  templateUrl: 'main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  isLogged: boolean = false;
  count$: Observable<number>;
  currentUserRole$: Observable<UserRolesTypes>;

  signInFormDialogRef: MatDialogRef<SignInFormComponent>;
  signUpFormDialogRef: MatDialogRef<SignUpFormComponent>;

  constructor(
    private dialog: MatDialog,
    private store: Store<IMainReducerState>,
    private router: Router,
    private authService: AuthService
  ) { }

  openSignInFormDialog(): void {
    this.signInFormDialogRef = this.dialog.open(SignInFormComponent);
  }

  openSignUpFormDialog(): void {
    this.signUpFormDialogRef = this.dialog.open(SignUpFormComponent);
  }

  logout(): void {
    this.authService.clearSessionStorage();
    this.store.dispatch(new ResetCurrentUser());
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.count$ = this.store.pipe(select(selectFeatureCount));
    this.currentUserRole$ = this.store.pipe(select(getCurrentUserRole));

    this.currentUserRole$.pipe(take(1)).subscribe((userRole: UserRolesTypes) => {
      this.isLogged = (userRole === UserRoles.OWNER) || (userRole === UserRoles.ACCOUNT_OWNER);
    });

    // console.log(this.authService.getToken());
    if (!!this.authService.getToken()) {
      this.store.dispatch(new StartLoadCurrentUserInfo());
    }
  }
}