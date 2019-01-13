import { routerReducer } from '@ngrx/router-store';
import { counterReducer } from './main-layout/ngrx/reducer';

export const reducers: object = {
  router: routerReducer,
  counter: counterReducer,
};
