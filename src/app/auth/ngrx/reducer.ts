import { AuthTypesOfActions } from './actions';
import { IAuthReducerState } from '../auth.models';
import { ActionTypes } from './action-types';
import { UserRoles } from '../../common/user-roles';
import { LoadingStatuses } from '../../common/loading-statuses';

export const initialState: IAuthReducerState = {
  loadingStatus: LoadingStatuses.INITIAL,
  name: 'unknown',
  surname: 'unknown',
  email: 'unknown',
  role: UserRoles.UNKNOWN
};

export function authReducer(state: IAuthReducerState = initialState, action: AuthTypesOfActions): IAuthReducerState {
  switch (action.type) {
    case ActionTypes.LOAD_CURRENT_USER_INFO:
      return { ...state, loadingStatus: LoadingStatuses.LOADING };

    case ActionTypes.LOAD_CURRENT_USER_INFO_SUCCESS:
      return { ...state, ...action.payload, loadingStatus: LoadingStatuses.SUCCESS };

    case ActionTypes.SIGNUP_USER_SUCCESS: {
      console.log(action.payload);
      return { ...state, ...action.payload };
    }

    case ActionTypes.LOAD_CURRENT_USER_INFO_FAIL:
      return { ...initialState, loadingStatus: LoadingStatuses.FAIL };

    default:
      return state;
  }
};
