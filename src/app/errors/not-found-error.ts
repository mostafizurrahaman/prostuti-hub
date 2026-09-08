import { AppError } from "./app-error";
import httpStatus from "http-status";

export class NotFoundError extends AppError {
   constructor(message: string, stack = "") {
      super(httpStatus.NOT_FOUND, message, stack);
   }
}
