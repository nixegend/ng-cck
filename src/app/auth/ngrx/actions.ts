import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionTypes } from './action-types';
import { ICurrentUser, ISignUpUserInfo } from '../../common/models';

export class StartUserRegistration implements Action {
  readonly type = ActionTypes.REGISTRATION_OF_USER;
  constructor(public payload: ISignUpUserInfo) { }
}

export class SuccessUserRegistration implements Action {
  readonly type = ActionTypes.REGISTRATION_OF_USER_SUCCESS;
  constructor(public payload: any) { }
}

export class FailUserRegistration implements Action {
  readonly type = ActionTypes.REGISTRATION_OF_USER_FAIL;
  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class StartLoadCurrentUserInfo implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_USER_INFO;
}

export class SuccessLoadCurrentUserInfo implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_USER_INFO_SUCCESS;
  constructor(public payload: ICurrentUser) { }
}

export class FailLoadCurrentUserInfo implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_USER_INFO_FAIL;
  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export type AuthTypesOfActions =
  StartUserRegistration
  | SuccessUserRegistration
  | FailUserRegistration
  | StartLoadCurrentUserInfo
  | SuccessLoadCurrentUserInfo
  | FailLoadCurrentUserInfo;
