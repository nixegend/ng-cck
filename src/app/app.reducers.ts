import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { counterReducer, INumReducerState } from './main-layout/ngrx/reducer';
import { IAuthReducerState } from './auth/auth.models';
import { authReducer } from './auth/ngrx/reducer';

export interface IMainReducerState {
  router: RouterReducerState;
  auth: IAuthReducerState;
  counter: INumReducerState;
}

export const reducers: ActionReducerMap<IMainReducerState> = {
  auth: authReducer,
  router: routerReducer,
  counter: counterReducer
}

export const getAuthReducerState = (state: IMainReducerState) => state.auth;
export const getCounterReducerState = (state: IMainReducerState) => state.counter;
export const getRouterReducerState = (state: IMainReducerState) => state.router;

export function debugNgrx(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('action', action);
    console.log('state', state);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debugNgrx];
