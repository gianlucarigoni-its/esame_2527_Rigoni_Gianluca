import { Classroom } from "../classroom/classroom.entity";
import { User } from "../user/user.entity";

export type Assignment = {
  id: string;
  title: string;
  classroom: Classroom;
  studentsCompleted: User[];
  studentsCount: number;
  completedCount: number;
  completed: boolean;
  createdAt: string;
  createdBy: User;
};
