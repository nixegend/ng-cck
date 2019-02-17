import { createSelector } from '@ngrx/store';
import { INumReducerState } from './reducer';
import { getCounterReducerState } from '../../app.reducers';

export const selectFeatureCount = createSelector(
  getCounterReducerState,
  (state: INumReducerState) => state.num
);
