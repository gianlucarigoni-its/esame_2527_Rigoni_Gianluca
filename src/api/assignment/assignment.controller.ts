import { Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AssignmentDto } from "./assignment.dto";
import { Role } from "../../utils/user.role.enum";
import { PermissionDeniedError } from "../../errors/permission-denied.error";
import assignmentSrv from "./assignment.service";

export const add = async (req: TypedRequest<AssignmentDto>, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role != Role.teacher) throw new PermissionDeniedError();

    const result = await assignmentSrv.add(req.body.title, req.params.classroomId, req.user.id);

    if (result == null) throw new Error("errore");

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
