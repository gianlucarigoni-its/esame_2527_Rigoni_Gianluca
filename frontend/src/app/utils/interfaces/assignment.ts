import { User } from './user';

export interface Assignment {
  id: string;
  title: string;
  studentsCount: number;
  completedCount: number;
  completed?: boolean;
  createdAt: string;
  createdBy: User;
}
