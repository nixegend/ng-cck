import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StartUserRegistration } from '../auth/ngrx/actions';
import { Store, select } from '@ngrx/store';
import { SignUpInfo } from './signup-info';
import { ISignUpUserInfo } from '../common/models';
import { ProcessingStatusesTypes, ProcessingStatuses } from '../common/processing-statuses';
import { UserRoles } from '../common/user-roles';

import { IMainReducerState } from '../app.reducers';
import { getAuthRegistrationState } from './selectors';

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
  currentRegistrationState$: Observable<ProcessingStatusesTypes>;

  form: any = {
    role: UserRoles.USER
  };

  signupInfo: ISignUpUserInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  roles: Roles[] = [
    { value: UserRoles.USER, viewValue: UserRoles.USER },
    { value: UserRoles.ADMIN, viewValue: UserRoles.ADMIN },
  ];

  constructor(
    private store: Store<IMainReducerState>,
  ) {
    this.currentRegistrationState$ = store.pipe(select(getAuthRegistrationState));
  }

  ngOnInit() { }

  onSubmit() {
    this.signupInfo = new SignUpInfo(this.form.name, this.form.surname, this.form.email, this.form.password, this.form.role);
    console.log(this.signupInfo);

    this.store.dispatch(new StartUserRegistration(this.signupInfo));
  }
}
