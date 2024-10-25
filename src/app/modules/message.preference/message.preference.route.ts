import express from "express";
import { MessagePreferenceValidation } from "./message.preference.validation";
import { validateRequest } from "../../middlewares/validate.request";
import { MessagePreferenceController } from "./message.preference.controller";
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
    MessagePreferenceValidation.createMessagePreferenceValidationSchema,
  ),
  MessagePreferenceController.createMessagePreference,
);

export const MessagePreferenceRoutes = router;
