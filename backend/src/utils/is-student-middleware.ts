import { NextFunction, Response } from "express";
import { PermissionDeniedError } from "../errors/permission-denied.error";
import { TypedRequest } from "./typed-request.interface";
import { Role } from "./user.role.enum";

export function isStudent(req: TypedRequest, res: Response, next: NextFunction) {
  try {
    if (req.user!.role != Role.student) throw new PermissionDeniedError();
    next();
  } catch (err) {
    next(err);
  }
}
