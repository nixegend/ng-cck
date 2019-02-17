import { createSelector } from '@ngrx/store';
import { IAuthReducerState } from '../auth/auth.models';
import { getAuthReducerState } from '../app.reducers';

export const getAuthRegistrationState = createSelector(
  getAuthReducerState,
  (state: IAuthReducerState) => state.registrationStatus
);
