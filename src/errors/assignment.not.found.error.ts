import { NextFunction, Request, Response } from "express";

export class AssignmentNotFoundError extends Error {
  constructor() {
    super();
    this.message = "Assignment not found";
    this.name = "AssignmnetNotFound";
  }
}

export const assignmentNotFoundHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AssignmentNotFoundError) {
    res.status(404);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
