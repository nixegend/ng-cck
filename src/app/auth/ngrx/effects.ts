import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { map, switchMap, distinctUntilChanged, catchError, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { ActionTypes } from './action-types';

import {
  StartLoadAllUsers,
  SuccessLoadAllUsers,
  FailLoadAllUsers,
  StartUserLogin,
  SuccessUserLogin,
  FailUserLogin,
  StartUserRegistration,
  SuccessUserRegistration,
  FailUserRegistration,
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
  public getAllUser$: Observable<Action> = this.actions$.pipe(
    ofType<StartLoadAllUsers>(ActionTypes.LOAD_ALL_USERS),
    switchMap(() => this.authService.getAllUsers().pipe(
      map(result => new SuccessLoadAllUsers(result)),
      catchError(error => of(new FailLoadAllUsers(error)))
    )
    )
  );

  @Effect()
  public getCurrentUser$: Observable<Action> = this.actions$.pipe(
    ofType<StartLoadCurrentUserInfo>(ActionTypes.LOAD_CURRENT_USER_INFO),
    switchMap(() => this.authService.getCurrentUser().pipe(
      map(result => new SuccessLoadCurrentUserInfo(result)),
      catchError(error => of(new FailLoadCurrentUserInfo(error)))
    )
    )
  );

  @Effect()
  public signUpUser$: Observable<Action> = this.actions$.pipe(
    ofType<StartUserRegistration>(ActionTypes.REGISTRATION_OF_USER),
    distinctUntilChanged((x, y) => x.payload === y.payload),
    mergeMap((action: StartUserRegistration) => this.authService.signUpUser(action.payload).pipe(
      map(() => new SuccessUserRegistration()),
      catchError(error => of(new FailUserRegistration(error)))
    )
    )
  );

  @Effect()
  public signInUser$: Observable<Action> = this.actions$.pipe(
    ofType<StartUserLogin>(ActionTypes.AUTHENTICATION_OF_USER),
    distinctUntilChanged((x, y) => x.payload === y.payload),
    mergeMap((action: StartUserLogin) => this.authService.signInUser(action.payload).pipe(
      map(result => {
        this.authService.saveToken(result.token);

        delete result.token;

        return new SuccessUserLogin(result);
      }),
      catchError(error => of(new FailUserLogin(error)))
    )
    )
  );
}
