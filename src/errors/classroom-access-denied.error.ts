import { NextFunction, Request, Response } from "express";

export class ClassroomAccessDeniedError extends Error {
  constructor() {
    super();
    this.message = "You don't have the permission to access to this classroom";
    this.name = "ClassroomAccessDenied";
  }
}

export const classroomAccessDeniedHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ClassroomAccessDeniedError) {
    res.status(404);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
