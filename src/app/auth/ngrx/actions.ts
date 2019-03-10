import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionTypes } from './action-types';
import { ICurrentUser, ISignUpUserInfo, ISignInUserInfo } from '../../common/models';

export class StartLoadAllUsers implements Action {
  readonly type = ActionTypes.LOAD_ALL_USERS;
}

export class SuccessLoadAllUsers implements Action {
  readonly type = ActionTypes.LOAD_ALL_USERS_SUCCESS;
  constructor(readonly payload: ICurrentUser[]) { }
}

export class FailLoadAllUsers implements Action {
  readonly type = ActionTypes.LOAD_ALL_USERS_FAIL;
  constructor(readonly payload: HttpErrorResponse) { }
}

export class StartUserLogin implements Action {
  readonly type = ActionTypes.AUTHENTICATION_OF_USER;
  constructor(readonly payload: ISignInUserInfo) { }
}

export class SuccessUserLogin implements Action {
  readonly type = ActionTypes.AUTHENTICATION_OF_USER_SUCCESS;
  constructor(readonly payload: ICurrentUser) { }
}

export class FailUserLogin implements Action {
  readonly type = ActionTypes.AUTHENTICATION_OF_USER_FAIL;
  constructor(readonly payload: HttpErrorResponse) { }
}

export class StartUserRegistration implements Action {
  readonly type = ActionTypes.REGISTRATION_OF_USER;
  constructor(readonly payload: ISignUpUserInfo) { }
}

export class SuccessUserRegistration implements Action {
  readonly type = ActionTypes.REGISTRATION_OF_USER_SUCCESS;
}

export class FailUserRegistration implements Action {
  readonly type = ActionTypes.REGISTRATION_OF_USER_FAIL;
  constructor(readonly payload: HttpErrorResponse) { }
}

export class StartLoadCurrentUserInfo implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_USER_INFO;
}

export class SuccessLoadCurrentUserInfo implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_USER_INFO_SUCCESS;
  constructor(readonly payload: ICurrentUser) { }
}

export class FailLoadCurrentUserInfo implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_USER_INFO_FAIL;
  constructor(readonly payload: HttpErrorResponse) { }
}

export class ResetCurrentUser implements Action {
  readonly type = ActionTypes.RESET_CURRENT_USER_INFO;
}

export type AuthTypesOfActions =
  StartLoadAllUsers
  | SuccessLoadAllUsers
  | FailLoadAllUsers
  | StartUserLogin
  | SuccessUserLogin
  | FailUserLogin
  | StartUserRegistration
  | SuccessUserRegistration
  | FailUserRegistration
  | StartLoadCurrentUserInfo
  | SuccessLoadCurrentUserInfo
  | FailLoadCurrentUserInfo
  | ResetCurrentUser;
