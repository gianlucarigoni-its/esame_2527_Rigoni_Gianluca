import { Router } from "express";
import { validate } from "../../utils/validation-middleware";
import { UserFileterDto } from "./user.dto";
import { getUser, list } from "./user.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();

router.use(isAuthenticated);
router.get("/me", getUser);
router.get("/", validate(UserFileterDto, "query"), list);

export default router;
