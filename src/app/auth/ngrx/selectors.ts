import { createSelector } from '@ngrx/store';

import { IAuthReducerState } from '../auth.models';
import { getAuthReducerState } from '../../app.reducers';

export const getCurrentUserRole = createSelector(getAuthReducerState, (state: IAuthReducerState) => state.role);
export const getCurrentAuthStatus = createSelector(getAuthReducerState, (state: IAuthReducerState) => state.authenticationStatus);
export const getAuthRegistrationState = createSelector(getAuthReducerState, (state: IAuthReducerState) => state.registrationStatus);