import { NextFunction, Request, Response } from "express";

export class StudentNotFoundError extends Error {
  constructor() {
    super();
    this.message = "Student not found or isn't a student";
    this.name = "StudentNotFound";
  }
}

export const studentNotFoundHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof StudentNotFoundError) {
    res.status(404);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
