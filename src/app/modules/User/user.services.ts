import httpStatus from "http-status";
import type { PipelineStage } from "mongoose";
import type {
   TCreateUserPayloadType,
   TUpdateUserPayloadType,
   TGetAllUserQueryParamsType,
} from "./user.validations";
import { AppError } from "../../errors";
import { User } from "./user.model";
import { userSearchableFields } from "./user.constants";
import type { TMulterFile } from "../../interfaces/multer.types";
import uploadFileIntoCloudinary from "../../utils/cloudinary/upload-file";
import { File_FOLDER_NAME } from "../../constants/folder_name";
import { hashPassword } from "../../utils";
import { configs } from "../../configs";

const createUser = async (
   payload: TCreateUserPayloadType,
   profileImage: TMulterFile,
) => {
   const { email, name, phone, password } = payload;

   // ?? Check with this email is any user exists?
   const existingUser = await User.findOne({
      email,
   });

   if (existingUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "This email already in use.");
   }

   // ?? Check this phone number already in use?:
   const associatedUserWithPhone = await User.findOne({
      phone,
   });

   if (associatedUserWithPhone) {
      throw new AppError(
         httpStatus.BAD_REQUEST,
         "This phone number already in use.",
      );
   }

   let newProfileUrl: string | null = null;

   // ?? File Upload:
   if (profileImage) {
      const url = await uploadFileIntoCloudinary(
         profileImage,
         File_FOLDER_NAME.PROFILE_IMAGES,
      );
      newProfileUrl = url;
   }

   // ?? Hash the password:
   const hashedPassword = await hashPassword(
      password,
      configs.passwordSaltRound,
   );

   try {
   } catch (error) {}

   const result = await User.create(payload);
   return result;
};

const updateUser = async (id: string, payload: TUpdateUserPayloadType) => {
   const result = await User.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true },
   );

   if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
   }

   return result;
};

const getAllUser = async (query: TGetAllUserQueryParamsType) => {
   const {
      page = 1,
      limit = 10,
      searchTerm,
      sortOrder = "desc",
      sortBy = "createdAt",
      fromDate,
      toDate,
   } = query;

   const skip = (page - 1) * limit;
   const pipeline: PipelineStage[] = [];

   if (fromDate || toDate) {
      const dateFilter: Record<string, unknown> = {};
      if (fromDate) dateFilter.$gte = new Date(fromDate);
      if (toDate) dateFilter.$lte = new Date(toDate);

      pipeline.push({ $match: { createdAt: dateFilter } });
   }

   if (searchTerm) {
      pipeline.push({
         $match: {
            $or: userSearchableFields.map((field) => ({
               [field]: { $regex: searchTerm, $options: "i" },
            })),
         },
      });
   }

   pipeline.push({ $sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 } });

   pipeline.push({
      $facet: {
         data: [{ $skip: skip }, { $limit: limit }],
         meta: [{ $count: "total" }],
      },
   });

   const aggregated = await User.aggregate(pipeline);

   const data = aggregated?.[0]?.data || [];
   const total = aggregated?.[0]?.meta?.[0]?.total || 0;

   return {
      data,
      meta: {
         page,
         limit,
         total,
         totalPages: Math.ceil(total / limit) || 1,
      },
   };
};

const getUserById = async (id: string) => {
   const result = await User.findById(id);

   if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
   }

   return result;
};

const deleteUserById = async (id: string) => {
   const result = await User.findOneAndDelete({ _id: id });

   if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
   }

   return result;
};

export const userServices = {
   createUser,
   updateUser,
   getAllUser,
   getUserById,
   deleteUserById,
};
