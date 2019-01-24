import { Action } from '@ngrx/store';
import { ActionTypes } from './action-types';

export class Increment implements Action {
  readonly type = ActionTypes.INCREMENT;
}

export class Decrement implements Action {
  readonly type = ActionTypes.DECREMENT;
}

export class Reset implements Action {
  readonly type = ActionTypes.RESET;
}