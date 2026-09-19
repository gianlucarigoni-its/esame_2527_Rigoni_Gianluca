import { Router } from "express";
import { validate } from "../../utils/validation-middleware";
import { add, completeAssignment, list } from "./assignment.controller";
import { AssignmentDto } from "./assignment.dto";
import { isTeacher } from "../../utils/is-teacher-middleware";
import { isStudent } from "../../utils/is-student-middleware";

const router = Router({ mergeParams: true });

router.get("/", list);
router.post("/", isTeacher, validate(AssignmentDto, "body"), add);
router.patch("/:id", isStudent, completeAssignment);

export default router;
