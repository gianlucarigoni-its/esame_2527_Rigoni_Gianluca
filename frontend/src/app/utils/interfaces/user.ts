import { Role } from '../enum/role';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: Role;
  picture: string;
}
