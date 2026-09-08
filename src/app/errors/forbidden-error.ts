import { AppError } from "./app-error";
import httpStatus from "http-status";

export class ForbiddenError extends AppError {
   constructor(message: string, stack = "") {
      super(httpStatus.FORBIDDEN, message, stack);
   }
}
