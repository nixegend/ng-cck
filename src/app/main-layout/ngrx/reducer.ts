import { Action } from '@ngrx/store';
import { ActionTypes } from './action-types';

export const initialState: number = 0;

export function counterReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return state + 1;

    case ActionTypes.DECREMENT:
      return state - 1;

    case ActionTypes.RESET:
      return 0;

    default:
      return state;
  }
}