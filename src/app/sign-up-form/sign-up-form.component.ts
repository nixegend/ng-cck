import { Component, OnInit } from '@angular/core';

import { StartSignUpUser } from '../auth/ngrx/actions';
import { Store, select } from '@ngrx/store';
import { SignUpInfo } from './signup-info';
import { ISignUpUserInfo } from '../common/models';
import { UserRoles } from '../common/user-roles';

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

  constructor(private store: Store<{}>) { }

  ngOnInit() { }

  onSubmit() {
    this.signupInfo = new SignUpInfo(this.form.name, this.form.surname, this.form.email, this.form.password, this.form.role);
    console.log(this.signupInfo);

    this.store.dispatch(new StartSignUpUser(this.signupInfo));
  }
}
