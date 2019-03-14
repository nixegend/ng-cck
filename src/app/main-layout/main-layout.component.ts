import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { UserRolesTypes, UserRoles } from '../common/user-roles';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

import { getCurrentUserRole, getAuthState } from '../auth/ngrx/selectors';
import { IMainReducerState } from '../app.reducers';

import { StartLoadCurrentUserInfo, ResetCurrentUser } from '../auth/ngrx/actions';

@Component({
  selector: '.app-root-container',
  templateUrl: 'main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  currentUserRole$: Observable<UserRolesTypes>;

  signInFormDialogRef: MatDialogRef<SignInFormComponent>;
  signUpFormDialogRef: MatDialogRef<SignUpFormComponent>;

  languages = ['en', 'ua'];

  menuItems = [
    { link: '/home', label: 'Home' },
    { link: '/test', label: 'Test' },
  ];

  constructor(
    private dialog: MatDialog,
    private store: Store<IMainReducerState>,
    private router: Router,
    private authService: AuthService
  ) { }

  protected openSignInFormDialog(): void {
    this.signInFormDialogRef = this.dialog.open(SignInFormComponent);
  }

  protected openSignUpFormDialog(): void {
    this.signUpFormDialogRef = this.dialog.open(SignUpFormComponent);
  }

  protected logout(): void {
    this.authService.clearSessionStorage();
    this.store.dispatch(new ResetCurrentUser());
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.currentUserRole$ = this.store.pipe(select(getCurrentUserRole));
    this.isAuthenticated$ = this.store.pipe(select(getAuthState));

    // console.log(this.authService.getToken());
    if (!!this.authService.getToken()) {
      this.store.dispatch(new StartLoadCurrentUserInfo());
    }
  }
}