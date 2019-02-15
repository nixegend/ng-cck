import { Component, OnInit } from '@angular/core';

import { StartSignUpUser } from '../auth/ngrx/actions';
import { Store, select } from '@ngrx/store';
import { SignUpInfo } from './signup-info';
import { ISignUpUserInfo } from '../common/models';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  form: any = {};
  signupInfo: ISignUpUserInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private store: Store<{}>) { }

  ngOnInit() { }

  onSubmit() {
    this.signupInfo = new SignUpInfo(this.form.name, this.form.surname, this.form.email, this.form.password);
    console.log(this.signupInfo);

    this.store.dispatch(new StartSignUpUser(this.signupInfo));

    // this.authService.signUp(this.signupInfo).subscribe(
    //   data => {
    //     console.log(data);
    //     this.isSignedUp = true;
    //     this.isSignUpFailed = false;
    //   },
    //   error => {
    //     console.log(error);
    //     this.errorMessage = error.error;
    //     this.isSignUpFailed = true;
    //   }
    // );
  }
}
