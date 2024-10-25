import express from "express";
import { AuthValidation } from "./auth.validation";
import { validateRequest } from "../../middlewares/validate.request";
import { AuthController } from "./auth.controller";
const router = express.Router();

// create chat
router.post(
  "/login",
  /* guestId will automatically find through createGuestUserIfNeed middleware */
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

router.get("/logout", AuthController.logoutUser);


export const AuthRoutes = router;
