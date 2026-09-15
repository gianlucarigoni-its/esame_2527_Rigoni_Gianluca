import { Classroom } from "../classroom/classroom.entity";
import { User } from "../user/user.entity";

export type StudentAssignment = {
  studentId: string;
  completed: boolean;
};

export type Assignment = {
  title: string;
  classroom: string | Classroom;
  students: StudentAssignment[];
  createdBy: string | User;
};
