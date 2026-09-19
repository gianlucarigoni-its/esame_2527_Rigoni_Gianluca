import { NextFunction, Request, Response } from "express";

export class AssignmentAlreadyCompletedError extends Error {
  constructor() {
    super();
    this.message = "Assignment already completed";
    this.name = "AlreadyCompleted";
  }
}

export const assignmentAlreadyCompletedHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AssignmentAlreadyCompletedError) {
    res.status(400);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
