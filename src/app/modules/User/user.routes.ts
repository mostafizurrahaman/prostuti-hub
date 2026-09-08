import express, { Router } from "express";
import { userControllers } from "./user.controllers";
import { userValidations } from "./user.validations";
import { validateRequest } from "../../middlewares";

const router: Router = express.Router();

router.post(
   "/",
   validateRequest(userValidations.createUserSchema),
   userControllers.createUser,
);

router.patch(
   "/:id",
   validateRequest(userValidations.updateUserSchema),
   userControllers.updateUser,
);

router.get(
   "/all",
   validateRequest(userValidations.getAllUserSchema),
   userControllers.getAllUser,
);

router.get(
   "/:id",
   validateRequest(userValidations.getUserByIdSchema),
   userControllers.getUserById,
);

router.delete(
   "/:id",
   validateRequest(userValidations.deleteUserByIdSchema),
   userControllers.deleteUserById,
);

export const userRoutes = router;
