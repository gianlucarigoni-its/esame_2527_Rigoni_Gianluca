import { Types } from "mongoose";
import { Classroom } from "../classroom/classroom.entity";
import { User } from "../user/user.entity";

export type StudentAssignment = {
  studentId: string | Types.ObjectId;
  completed: boolean;
};

export type Assignment = {
  title: string;
  classroom: string | Classroom;
  students: StudentAssignment[];
  createdAt: Date;
  updatedAt?: Date;
  createdBy: string | User;
};
