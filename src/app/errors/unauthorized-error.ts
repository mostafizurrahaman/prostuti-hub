import { AppError } from "./app-error";
import httpStatus from "http-status";

export class UnauthorizedError extends AppError {
   constructor(message: string, stack = "") {
      super(httpStatus.UNAUTHORIZED, message, stack);
   }
}
