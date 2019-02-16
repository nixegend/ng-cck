import { ISignUpUserInfo } from '../common/models';

export class SignUpInfo implements ISignUpUserInfo {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;

  constructor(name: string, surname: string, email: string, password: string, role: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
