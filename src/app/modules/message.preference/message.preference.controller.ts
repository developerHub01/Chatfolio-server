import httpStatus from "http-status";
import catchAsync from "../../utils/catch.async";
import { sendResponse } from "../../utils/send.response";
import { MessagePreferenceService } from "./message.preference.service";

const createMessagePreference = catchAsync(async (req, res) => {
  const result = await MessagePreferenceService.createMessagePreference(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "chat details found succesfully",
    data: result,
  });
});

export const MessagePreferenceController = {
  createMessagePreference,
};
