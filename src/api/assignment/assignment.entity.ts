import { Types } from "mongoose";

export type StudentAssignment = {
  studentId: string | Types.ObjectId;
  completed: boolean;
};

export type Assignment = {
  id: string | Types.ObjectId;
  title: string;
  classroom: string | Types.ObjectId;
  students: StudentAssignment[];
  studentsCount: number;
  completedCount: number;
  createdAt: Date;
  createdBy: string | Types.ObjectId;
};

export type AssignmentDocument = {
  title: string;
  classroom: string | Types.ObjectId;
  students: StudentAssignment[];
  createdBy: string | Types.ObjectId;
};
