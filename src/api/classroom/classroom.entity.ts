import { Types } from "mongoose";
import { User } from "../user/user.entity";

export type Classroom = {
  id: string | Types.ObjectId;
  name: string;
  students: Types.ObjectId[];
  studentsCount: number;
  createdBy: string | Types.ObjectId;
};
