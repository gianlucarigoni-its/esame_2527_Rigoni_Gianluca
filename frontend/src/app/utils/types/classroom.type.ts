import { User } from './user.type';

export type Classroom = {
  id: string;
  name: string;
  studentsCount: number;
  students: User[];
  createdBy: User;
};
