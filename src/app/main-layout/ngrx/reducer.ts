import { Action } from '@ngrx/store';
import { ActionTypes } from './action-types';

export interface INumReducerState {
  num: number;
}

export const initialState: INumReducerState = {
  num: 0
};

export function counterReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.INCREMENT:
    return { num: state.num - 1 };

    case ActionTypes.DECREMENT:
    return { num: state.num + 1 };

    case ActionTypes.RESET:
      return { num: 0 };

    default:
      return state;
  }
}
