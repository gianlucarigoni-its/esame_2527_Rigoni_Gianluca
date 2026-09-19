import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validate } from "../../utils/validation-middleware";
import { createClassroomDto } from "./classroom.dto";
import { create, list } from "./classroom.controller";
import assignmentRouter from "../assignment/assignment.router";
import { isTeacher } from "../../utils/is-teacher-middleware";

const router = Router();

router.use(isAuthenticated);
router.get("/", list);
router.post("/", isTeacher, validate(createClassroomDto, "body"), create);
router.use("/:classroomId/assignments", assignmentRouter);

export default router;
