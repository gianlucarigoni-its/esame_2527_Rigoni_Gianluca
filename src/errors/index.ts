import { validationHandler } from "./validation-error";
import { genericErrorHandler } from "./generic";
import { notFoundHandler } from "./not-found.error";
import { permissionDeniedHandler } from "./permission-denied.error";
import { userExistsHandler } from "./user-exists.error";
import { classroomNotFoundHandler } from "./classroom-not-found.error";
import { classroomAccessDeniedHandler } from "./classroom-access-denied.error";
import { assignmentNotFoundHandler } from "./assignment.not.found.error";
import { assignmentAlreadyCompletedHandler } from "./already-completed.error";
import { studentNotFoundHandler } from "./student-not-found.error";
import { teacherNotFoundHandler } from "./teacher-not-found";

export const errorHandlers = [
  validationHandler,
  userExistsHandler,
  notFoundHandler,
  permissionDeniedHandler,
  classroomNotFoundHandler,
  classroomAccessDeniedHandler,
  assignmentNotFoundHandler,
  assignmentAlreadyCompletedHandler,
  studentNotFoundHandler,
  teacherNotFoundHandler,
  genericErrorHandler,
];
