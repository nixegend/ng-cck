import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AuthService } from '../auth.service';
import { ActionTypes } from './action-types';

import {
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
  getCurrentUser$ = this.actions$.pipe(
      ofType<StartLoadCurrentUserInfo>(ActionTypes.LOAD_CURRENT_USER_INFO),
      switchMap(() => this.authService.getCurrentUser()
        .pipe(
          map(result => new SuccessLoadCurrentUserInfo(result)),
          catchError(error => of(new FailLoadCurrentUserInfo({ error })))
        )
      )
    );
}
