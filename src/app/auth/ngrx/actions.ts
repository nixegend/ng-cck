import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionTypes } from './action-types';
import { ICurrentUser } from '../../common/models';

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
  StartLoadCurrentUserInfo
  | SuccessLoadCurrentUserInfo
  | FailLoadCurrentUserInfo;
