import { UserRolesTypes } from './user-roles';

export interface ICurrentUser {
  token?: string;
  name: string;
  surname: string;
  email: string;
  role: UserRolesTypes | '';
}

export interface ISignUpUserInfo {
  name: string;
  surname: string;
  password: string;
  email: string;
  role: string;
}

export interface ISignInUserInfo {
  email: string;
  password: string;
}
