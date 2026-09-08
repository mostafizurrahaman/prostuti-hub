import z from "zod";
import {
   requiredString,
   optionalNumber,
   optionalEnumString,
   optionalString,
   optionalDate,
} from "../../utils";
import { userSortableFields } from "./user.constants";
import { sortOrderValues } from "../../constants";

const createUserSchema = z.object({
   body: z.object({}),
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
