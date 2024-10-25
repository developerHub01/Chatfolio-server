import httpStatus from "http-status";
import catchAsync from "../../utils/catch.async";
import { sendResponse } from "../../utils/send.response";
import { ChatPreferenceService } from "./chat.service";

const createChat = catchAsync(async (req, res) => {
  const result = await ChatPreferenceService.createChatPreference(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "chat details found succesfully",
    data: result,
  });
});

export const ChatPreferenceController = {
  createChat,
};
