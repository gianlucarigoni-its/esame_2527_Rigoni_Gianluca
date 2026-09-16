import { Router } from "express";
import { isAbsolute } from "node:path";
import { AssignmentDto } from "./assignment.dto";
import { validate } from "../../utils/validation-middleware";
import { add } from "./assignment.controller";

const router = Router({ mergeParams: true });

router.post("/", validate(AssignmentDto, "body"), add);

export default router;
