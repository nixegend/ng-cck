import { LoadingStatusesTypes } from '../common/loading-statuses';
import { ICurrentUser } from '../common/models';

export interface IAuthReducerState extends ICurrentUser {
  loadingStatus: LoadingStatusesTypes;
}
