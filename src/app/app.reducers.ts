import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { counterReducer } from './main-layout/ngrx/reducer';

import { IAuthReducerState } from './auth/auth.models';
import { authReducer } from './auth/ngrx/reducer';

export interface IMainReducerState {
  router: RouterReducerState;
  auth: IAuthReducerState;
  counter: number;
}

export const reducers: ActionReducerMap<IMainReducerState> = {
  auth: authReducer,
  router: routerReducer,
  counter: counterReducer
}
