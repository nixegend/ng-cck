import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProcessingStatusesTypes, ProcessingStatuses } from '../common/processing-statuses';
import { StartUserLogin } from '../auth/ngrx/actions';
import { getCurrentAuthStatus } from '../auth/ngrx/selectors';
import { IMainReducerState } from '../app.reducers';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {
  signInForm: FormGroup;
  submitted: boolean = false;
  isPending: boolean = false;
  currentAuthUserStatus$: Observable<ProcessingStatusesTypes>;

  constructor(
    private store: Store<IMainReducerState>,
    private signInDialog: MatDialogRef<SignInFormComponent>
  ) { }

  ngOnInit(): void {
    this.currentAuthUserStatus$ = this.store.pipe(select(getCurrentAuthStatus));

    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  protected onCloseSignInModalWindow(): void {
    this.signInDialog.close();
  }

  get formControls() { return this.signInForm.controls; }

  protected onSubmit(): void {
    if (this.signInForm.invalid) {
      this.submitted = true;
    } else {
      this.store.dispatch(new StartUserLogin({ email: this.formControls.email.value, password: this.formControls.password.value }));
      this.currentAuthUserStatus$.subscribe((status: ProcessingStatusesTypes) => {
        this.isPending = (status === ProcessingStatuses.SUCCESS) || (status === ProcessingStatuses.PENDING);

        if (status === ProcessingStatuses.SUCCESS) {
          this.signInDialog.close();
        }
      });
    }
  }
}
