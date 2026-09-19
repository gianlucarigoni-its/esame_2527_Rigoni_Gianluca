import { Types } from "mongoose";
import { User } from "../user/user.entity";

export type ClassroomResponse = {
  id: string | Types.ObjectId;
  name: string;
  studentsCount: number;
  createdBy: User;
};
