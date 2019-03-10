import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { SignUpInfo } from './signup-info';

import { UserRoles } from '../common/user-roles';
import { ISignUpUserInfo } from '../common/models';
import { StartUserRegistration } from '../auth/ngrx/actions';
import { IMainReducerState } from '../app.reducers';
import { getAuthRegistrationState } from './selectors';
import { ProcessingStatusesTypes } from '../common/processing-statuses';

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  signupInfo: ISignUpUserInfo;
  currentRegistrationState$: Observable<ProcessingStatusesTypes>;

  form: any = {
    role: UserRoles.USER
  };

  roles: Roles[];

  constructor(
    private store: Store<IMainReducerState>,
    private signUpDialog: MatDialogRef<SignUpFormComponent>
  ) {
    this.currentRegistrationState$ = store.pipe(select(getAuthRegistrationState));
  }

  ngOnInit(): void {
    this.roles = [
      { value: UserRoles.USER, viewValue: UserRoles.USER },
      { value: UserRoles.OWNER, viewValue: UserRoles.OWNER },
      { value: UserRoles.ACCOUNT_OWNER, viewValue: UserRoles.ACCOUNT_OWNER },
    ];
  }

  onCloseSignUpModalWindow() {
    this.signUpDialog.close();
  }

  onSubmit(): void {
    this.signupInfo = new SignUpInfo(this.form.name, this.form.surname, this.form.email, this.form.password, this.form.role);
    console.log(this.signupInfo);

    this.store.dispatch(new StartUserRegistration(this.signupInfo));
  }
}
