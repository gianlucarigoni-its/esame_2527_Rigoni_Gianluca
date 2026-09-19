import { NextFunction, Request, Response } from "express";

export class ClassroomNotFoundError extends Error {
  constructor() {
    super();
    this.message = "Classroom not found";
    this.name = "ClassroomNotFound";
  }
}

export const classroomNotFoundHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ClassroomNotFoundError) {
    res.status(404);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
