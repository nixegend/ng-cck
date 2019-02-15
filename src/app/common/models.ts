import { UserRoleTypes } from './user-roles';

export interface ICurrentUser {
  token?: string;
  name: string;
  surname: string;
  email: string;
  role: UserRoleTypes;
}

export interface ISignUpUserInfo {
  name: string;
  surname: string;
  password: string;
  email: string;
}
