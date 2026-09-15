import { User } from "../user/user.entity";

export type Classroom = {
  id: string;
  name: string;
  students: User[];
  studentsCount: number;
  createdBy: User;
};
