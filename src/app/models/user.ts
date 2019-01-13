import { Role } from "./role";

export class User {
  name: string;
  surname: string;
  role: Role;
  token?: string;
}
