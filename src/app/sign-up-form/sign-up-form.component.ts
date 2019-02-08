import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from './signup-info';
import { ISignUpUserInfo } from './models';

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

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(this.form.name, this.form.surname, this.form.email, this.form.password);

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
