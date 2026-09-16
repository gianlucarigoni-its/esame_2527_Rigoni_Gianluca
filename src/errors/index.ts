import { validationHandler } from "./validation-error";
import { genericErrorHandler } from "./generic";
import { notFoundHandler } from "./not-found.error";
import { permissionDeniedHandler } from "./permission-denied.error";

export const errorHandlers = [validationHandler, notFoundHandler, permissionDeniedHandler, genericErrorHandler];
