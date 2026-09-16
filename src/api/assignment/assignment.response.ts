import { Types } from "mongoose";
import { User } from "../user/user.entity";

export type assignmentResponse = {
  id: string | Types.ObjectId;
  title: string;
  studentsCount: number;
  completedCount: number;
  completed: boolean;
  createdAt: Date;
  createdBy: User;
};
