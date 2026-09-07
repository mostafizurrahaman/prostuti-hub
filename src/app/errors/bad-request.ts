import { AppError } from "./app-error";
import httpStatus from "http-status";

export class BadRequest extends AppError {
   constructor(message: string, stack = "") {
      super(httpStatus.BAD_REQUEST, message, stack);
   }
}
