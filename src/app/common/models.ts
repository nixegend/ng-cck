import { UserRoleTypes } from './user-roles';

export interface ICurrentUser {
  name: string;
  surname: string;
  email: string;
  role: UserRoleTypes;
}