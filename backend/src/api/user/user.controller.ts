import { Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import UserSrv from "./user.service";
import { UserFileterDto } from "./user.dto";
import { PermissionDeniedError } from "../../errors/permission-denied.error";

export const list = async (req: TypedRequest<unknown, UserFileterDto>, res: Response, next: NextFunction) => {
  try {
    let result = await UserSrv.find(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: TypedRequest, res: Response, next: NextFunction) => {
  if (req.user) res.status(200).json(req.user);
  else next(new PermissionDeniedError());
};
