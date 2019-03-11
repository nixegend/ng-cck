import { ProcessingStatusesTypes } from '../common/processing-statuses';
import { ICurrentUser } from '../common/models';

export interface IAuthReducerState extends ICurrentUser {
  users: ICurrentUser[];
  isAuthenticated: boolean;
  authenticationStatus: ProcessingStatusesTypes;
  registrationStatus: ProcessingStatusesTypes;
}
