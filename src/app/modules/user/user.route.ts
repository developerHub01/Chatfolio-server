import express from "express";
import { UserValidation } from "./user.validation";
import { validateRequest } from "../../middlewares/validate.request";
import { UserController } from "./user.controller";
import getLoggedInUser from "../../middlewares/get.loggedIn.user";
import { UserMiddleware } from "./user.middleware";
import readReqBodyFiles from "../../middlewares/read.req.body.files";
const router = express.Router();

// create password
router.get("/me", getLoggedInUser, UserController.getMyDetails);

router.get(
  "/:id" /*:id ====> userId*/,
  getLoggedInUser,
  UserController.getUserById,
);

router.post(
  "/",
  UserMiddleware.createOrUpdateUserAvatar,
  readReqBodyFiles,
  UserMiddleware.matchReqBodyFilesWithValidationSchema,
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser,
);

// update user
router.patch(
  "/",
  UserMiddleware.createOrUpdateUserAvatar,
  readReqBodyFiles,
  UserMiddleware.matchReqBodyFilesWithValidationSchema,
  validateRequest(UserValidation.updateUserValidationSchema),
  getLoggedInUser,
  UserController.updateUser,
);

// change password
router.patch(
  "/password",
  getLoggedInUser,
  validateRequest(UserValidation.updateUserPasswordValidationSchema),
  UserController.updateUserPassword,
);

router.get("/", UserController.findUser);
export const UserRoutes = router;
