import { ProcessingStatusesTypes } from '../common/processing-statuses';
import { ICurrentUser } from '../common/models';

export interface IAuthReducerState extends ICurrentUser {
  authenticationStatus: ProcessingStatusesTypes;
  registrationStatus: ProcessingStatusesTypes;
}
