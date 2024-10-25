import express from "express";
import { ChatValidation } from "./chat.validation";
import { validateRequest } from "../../middlewares/validate.request";
import { ChatController } from "./chat.controller";
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

  validateRequest(ChatValidation.createChatValidationSchema),
  ChatController.createChat,
);

export const ChatRoutes = router;
