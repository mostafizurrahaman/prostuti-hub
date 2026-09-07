import httpStatus from "http-status";
import catchAsync from "../utils/catch-async";
import { sendErrorResponse } from "../utils";

export const notFound = catchAsync(async (req, res) => {


  
   sendErrorResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      message: `API route not found!`,
      data: null,
   });
});
