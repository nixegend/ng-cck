import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
// import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { StartUserLogin } from '../auth/ngrx/actions';
import { IMainReducerState } from '../app.reducers';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {
  signInForm: FormGroup;
  // returnUrl: string;
  submitted: boolean = false;

  constructor(
    // private route: ActivatedRoute,
    // private router: Router,
    private store: Store<IMainReducerState>,
    private signInDialog: MatDialogRef<SignInFormComponent>
  ) {
    // if (this.authService.currentUserValue) {
    // this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onCloseSignInModalWindow() {
    this.signInDialog.close();
  }

  // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  get formControls() { return this.signInForm.controls; }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.submitted = true;
    } else {
      this.store.dispatch(new StartUserLogin({ email: this.formControls.email.value, password: this.formControls.password.value }));
      console.log({ email: this.formControls.email.value, password: this.formControls.password.value });
    }
  }
}
