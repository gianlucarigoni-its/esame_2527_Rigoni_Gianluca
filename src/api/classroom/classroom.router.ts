import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validate } from "../../utils/validation-middleware";
import { createClassroomDto } from "./classroom.dto";
import { create } from "./classroom.controller";

const router = Router();

router.use(isAuthenticated);
router.use("/", validate(createClassroomDto, "body"), create);

export default router;
