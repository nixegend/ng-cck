import { AuthTypesOfActions } from './actions';
import { IAuthReducerState } from '../auth.models';
import { ActionTypes } from './action-types';
import { UserRoles } from '../../common/user-roles';
import { ProcessingStatuses } from '../../common/processing-statuses';

export const initialState: IAuthReducerState = {
  loadingStatus: ProcessingStatuses.INITIAL,
  registrationStatus: ProcessingStatuses.INITIAL,
  name: 'unknown',
  surname: 'unknown',
  email: 'unknown',
  role: UserRoles.UNKNOWN
};

export function authReducer(state: IAuthReducerState = initialState, action: AuthTypesOfActions): IAuthReducerState {
  switch (action.type) {
    case ActionTypes.LOAD_CURRENT_USER_INFO:
      return { ...state, loadingStatus: ProcessingStatuses.LOADING };

    case ActionTypes.LOAD_CURRENT_USER_INFO_SUCCESS:
      return { ...state, ...action.payload, loadingStatus: ProcessingStatuses.SUCCESS };

    case ActionTypes.SIGNUP_USER:
      return { ...state, registrationStatus: ProcessingStatuses.LOADING };

    case ActionTypes.SIGNUP_USER_SUCCESS:
      return { ...state, registrationStatus: ProcessingStatuses.SUCCESS };

    case ActionTypes.SIGNUP_USER_FAIL:
      return { ...state, registrationStatus: ProcessingStatuses.FAIL };

    case ActionTypes.LOAD_CURRENT_USER_INFO_FAIL:
      return { ...initialState, loadingStatus: ProcessingStatuses.FAIL };

    default:
      return state;
  }
};
