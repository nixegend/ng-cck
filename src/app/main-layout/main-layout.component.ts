import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Increment, Decrement, Reset } from './ngrx/actions';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { UserRolesTypes } from '../common/user-roles';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

import { getCurrentUserRole } from '../auth/ngrx/selectors';
import { IMainReducerState } from '../app.reducers';
import { selectFeatureCount } from './ngrx/selectors';

@Component({
  selector: 'app-root',
  templateUrl: 'main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  count$: Observable<number>;
  currentUserRole$: Observable<'' | UserRolesTypes>;

  signInFormDialogRef: MatDialogRef<SignInFormComponent>;
  signUpFormDialogRef: MatDialogRef<SignUpFormComponent>;

  constructor(
    private dialog: MatDialog,
    private store: Store<IMainReducerState>,
    private router: Router,
    private authService: AuthService
  ) {
    this.count$ = store.pipe(select(selectFeatureCount));
    this.currentUserRole$ = this.store.pipe(select(getCurrentUserRole));
  }

  openSignInFormDialog(): void {
    this.signInFormDialogRef = this.dialog.open(SignInFormComponent);
  }

  openSignUpFormDialog(): void {
    this.signUpFormDialogRef = this.dialog.open(SignUpFormComponent);
  }

  increment(): void {
    this.store.dispatch(new Increment());
  }

  decrement(): void {
    this.store.dispatch(new Decrement());
  }

  reset(): void {
    this.store.dispatch(new Reset());
  }

  logout(): void {
    this.authService.clearSessionStorage();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    // console.log(this.tokenStorage.getToken());
    // this.store.dispatch(new StartLoadCurrentUserInfo());
    // if (this.authService.getToken()) {
    // }
  }
}