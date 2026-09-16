import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validate } from "../../utils/validation-middleware";
import { createClassroomDto } from "./classroom.dto";
import { create, list } from "./classroom.controller";
import assignmentRouter from "../assignment/assignment.router";

const router = Router();

router.use(isAuthenticated);
router.post("/", validate(createClassroomDto, "body"), create);
router.get("/", list);
router.use("/:classroomId/assignment", assignmentRouter);

export default router;
