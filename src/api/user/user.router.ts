import { Router } from "express";
import { validate } from "../../utils/validation-middleware";
import { UserFileterDto } from "./user.dto";
import { list } from "./user.controller";

const router = Router();

router.use("/", validate(UserFileterDto, "query"), list);

export default router;
