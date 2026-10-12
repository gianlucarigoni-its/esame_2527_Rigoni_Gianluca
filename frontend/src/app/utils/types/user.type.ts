import { Role } from '../enum/role.enum';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: Role;
  picture: string;
};
