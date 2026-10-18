import { User } from './user';

export interface Classroom {
  id: string;
  name: string;
  studentsCount: number;
  students: User[];
  createdBy: User;
}
