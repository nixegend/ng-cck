import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { ActionTypes } from './action-types';

import {
  StartSignUpUser,
  SuccessSignUpUser,
  FailSignUpUser,
  StartLoadCurrentUserInfo,
  FailLoadCurrentUserInfo,
  SuccessLoadCurrentUserInfo
} from './actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private authService: AuthService
  ) { }

  @Effect()
  public getCurrentUser$: Observable<Action> = this.actions$.pipe(
      ofType<StartLoadCurrentUserInfo>(ActionTypes.LOAD_CURRENT_USER_INFO),
      exhaustMap(() => this.authService.getCurrentUser()
        .pipe(
          map(result => new SuccessLoadCurrentUserInfo(result)),
          catchError(error => of(new FailLoadCurrentUserInfo({ error })))
        )
      )
    );

  @Effect()
  public signUpUser$: Observable<Action> = this.actions$.pipe(
      ofType<StartSignUpUser>(ActionTypes.SIGNUP_USER),
      exhaustMap(action => this.authService.signUpUser(action.payload)
        .pipe(
          map(result => new SuccessSignUpUser(result)),
          catchError(error => of(new FailSignUpUser({ error })))
        )
      )
    );
}
