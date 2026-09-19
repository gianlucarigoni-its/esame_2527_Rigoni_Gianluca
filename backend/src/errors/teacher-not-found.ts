import { NextFunction, Request, Response } from "express";

export class TeacherNotFoundError extends Error {
  constructor() {
    super();
    this.message = "Teacher not found or isn't a teacher";
    this.name = "TeacherNotFound";
  }
}

export const teacherNotFoundHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof TeacherNotFoundError) {
    res.status(404);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
