import httpStatus from "http-status";
import { userServices } from "./user.services";
import { sendResponse, catchAsync } from "../../utils";
import type { TMulterFile } from "../../interfaces/multer.types";

const createUser = catchAsync(async (req, res) => {
   const profileImage = req.file as TMulterFile;
   const result = await userServices.createUser(req.body, profileImage);

   sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "The user created successfully!",
      data: result,
   });
});

const updateUser = catchAsync(async (req, res) => {
   const result = await userServices.updateUser(
      req.params.id as string,
      req.body,
   );

   sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "The user updated successfully!",
      data: result,
   });
});

const getAllUser = catchAsync(async (req, res) => {
   const result = await userServices.getAllUser(req.query);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "The user retrieved successfully!",
      data: result.data,
      meta: result.meta,
   });
});

const getUserById = catchAsync(async (req, res) => {
   const result = await userServices.getUserById(req.params.id as string);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "The user retrieved successfully!",
      data: result,
   });
});

const deleteUserById = catchAsync(async (req, res) => {
   const result = await userServices.deleteUserById(req.params.id as string);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "The user deleted successfully!",
      data: result,
   });
});

export const userControllers = {
   createUser,
   updateUser,
   getAllUser,
   getUserById,
   deleteUserById,
};
