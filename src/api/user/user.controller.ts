import { Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import UserSrv from "./user.service";
import { UserFileterDto } from "./user.dto";

export const list = async (req: TypedRequest<unknown, UserFileterDto>, res: Response, next: NextFunction) => {
  try {
    let result = await UserSrv.find(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
