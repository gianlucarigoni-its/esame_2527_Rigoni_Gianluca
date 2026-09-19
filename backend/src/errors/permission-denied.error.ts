import { NextFunction, Request, Response } from "express";

export class PermissionDeniedError extends Error {
  constructor() {
    super();
    this.message = "Access denied. You lack the permissions to view this resource.";
    this.name = "Permission Denied";
  }
}

export const permissionDeniedHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof PermissionDeniedError) {
    res.status(404);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
