import z from "zod";
import {
   requiredString,
   optionalNumber,
   optionalEnumString,
   optionalString,
   optionalDate,
   requiredEmail,
} from "../../utils";
import { userSortableFields } from "./user.constants";
import { bdPhoneRegex, sortOrderValues } from "../../constants";

const createUserSchema = z.object({
   body: z.object({
      name: requiredString("Name"),
      email: requiredEmail("Email"),
      phone: requiredString("Phone").regex(bdPhoneRegex, {
         error: "Provide a valid bangladeshi number.",
      }),
      password: z
         .string()
         .min(8, "Password must be at least 8 characters")
         .regex(/[a-z]/, "Password must contain a lowercase letter")
         .regex(/[A-Z]/, "Password must contain an uppercase letter")
         .regex(/\d/, "Password must contain a number")
         .regex(/[@$!%*?&]/, "Password must contain a special character"),
      
   }),
});

const updateUserSchema = z.object({
   params: z.object({
      id: requiredString("ID"),
   }),
   body: z.object({}),
});

const getAllUserSchema = z.object({
   query: z.object({
      page: optionalNumber("Page"),
      limit: optionalNumber("Limit"),
      searchTerm: optionalString("Search term"),
      sortOrder: optionalEnumString(sortOrderValues, "Sort order"),
      sortBy: optionalEnumString(userSortableFields, "Sort by"),
      fromDate: optionalDate("From date"),
      toDate: optionalDate("To date"),
   }),
});

const getUserByIdSchema = z.object({
   params: z.object({
      id: requiredString("ID"),
   }),
});

const deleteUserByIdSchema = z.object({
   params: z.object({
      id: requiredString("ID"),
   }),
});

export const userValidations = {
   createUserSchema,
   updateUserSchema,
   getAllUserSchema,
   getUserByIdSchema,
   deleteUserByIdSchema,
};

export type TCreateUserPayloadType = z.infer<
   typeof createUserSchema.shape.body
>;
export type TUpdateUserPayloadType = z.infer<
   typeof updateUserSchema.shape.body
>;
export type TGetAllUserQueryParamsType = z.infer<
   typeof getAllUserSchema.shape.query
>;
export type TGetUserByIdParamsType = z.infer<
   typeof getUserByIdSchema.shape.params
>;
export type TDeleteUserByIdParamsType = z.infer<
   typeof deleteUserByIdSchema.shape.params
>;
