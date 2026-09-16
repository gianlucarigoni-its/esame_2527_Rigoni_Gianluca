import { Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { createClassroomDto } from "./classroom.dto";
import { Role } from "../../utils/user.role.enum";
import { PermissionDeniedError } from "../../errors/permission-denied.error";
import classroomSrv from "./classroom.service";

export const create = async (req: TypedRequest<createClassroomDto>, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role != Role.teacher) throw new PermissionDeniedError();

    let newClassroom = await classroomSrv.add(req.body.name, req.body.usersId, req.user!.id);

    if (!newClassroom) throw new Error();

    res.status(200).json(newClassroom);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new PermissionDeniedError();

    const result = await classroomSrv.list(req.user.id, req.user.role);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
