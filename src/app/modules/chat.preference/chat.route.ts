import express from "express";
import { ChatPreferenceValidation } from "./chat.validation";
import { validateRequest } from "../../middlewares/validate.request";
import { ChatPreferenceController } from "./chat.controller";
const router = express.Router();

// create chat
router.post(
  "/",
  /*
   *
   * These will need when req body contains any file or body is a form data
   *
   * // ChatMiddleware.createOrUpdateChatImages,
   * // ChatReqBodyFiles
   * // ChatMiddleware.matchReqBodyFilesWithValidationSchema,
   *
   */

  validateRequest(
    ChatPreferenceValidation.createChatPreferenceValidationSchema,
  ),
  ChatPreferenceController.createChat,
);

export const ChatPreferenceRoutes = router;
