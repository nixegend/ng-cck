import { AuthTypesOfActions } from './actions';
import { IAuthReducerState } from '../auth.models';
import { ActionTypes } from './action-types';
import { ProcessingStatuses } from '../../common/processing-statuses';

export const initialState: IAuthReducerState = {
  users: [],
  authenticationStatus: ProcessingStatuses.INITIAL,
  registrationStatus: ProcessingStatuses.INITIAL,
  name: '',
  surname: '',
  email: '',
  role: ''
};

export function authReducer(state: IAuthReducerState = initialState, action: AuthTypesOfActions): IAuthReducerState {
  switch (action.type) {
    case ActionTypes.AUTHENTICATION_OF_USER:
      return { ...state, authenticationStatus: ProcessingStatuses.PENDING };

    case ActionTypes.AUTHENTICATION_OF_USER_SUCCESS:
    case ActionTypes.LOAD_CURRENT_USER_INFO_SUCCESS:
      return { ...state, ...action.payload, authenticationStatus: ProcessingStatuses.SUCCESS };

    case ActionTypes.AUTHENTICATION_OF_USER_FAIL:
      return { ...initialState, authenticationStatus: ProcessingStatuses.FAIL };

    case ActionTypes.REGISTRATION_OF_USER:
      return { ...state, registrationStatus: ProcessingStatuses.PENDING };

    case ActionTypes.REGISTRATION_OF_USER_SUCCESS:
      return { ...state, registrationStatus: ProcessingStatuses.SUCCESS };

    case ActionTypes.REGISTRATION_OF_USER_FAIL:
      return { ...state, registrationStatus: ProcessingStatuses.FAIL };

    case ActionTypes.LOAD_ALL_USERS_SUCCESS:
      return { ...state, users: action.payload };

    default:
      return state;
  }
};
