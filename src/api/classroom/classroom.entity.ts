import { Types } from "mongoose";
import { User } from "../user/user.entity";

export type Classroom = {
  id: string;
  name: string;
  students: Types.ObjectId[];
  studentsCount: number;
  createdBy: Types.ObjectId | User;
};
