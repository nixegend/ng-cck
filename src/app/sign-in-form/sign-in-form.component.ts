import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
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
      console.log(this.formControls.email.value, this.formControls.password.value);
    }
  }
}
