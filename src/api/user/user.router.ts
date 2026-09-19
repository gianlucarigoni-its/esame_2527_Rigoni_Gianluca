import { Router } from "express";
import { validate } from "../../utils/validation-middleware";
import { UserFileterDto } from "./user.dto";
import { list } from "./user.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();

router.use(isAuthenticated);
router.use("/", validate(UserFileterDto, "query"), list);

export default router;
