import express from "express";
import { MessageValidation } from "./message.validation";
import { validateRequest } from "../../middlewares/validate.request";
import { MessageController } from "./message.controller";
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
    MessageValidation.createMessageValidationSchema,
  ),
  MessageController.createMessage,
);

export const MessageRoutes = router;
