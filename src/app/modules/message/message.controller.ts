import httpStatus from "http-status";
import catchAsync from "../../utils/catch.async";
import { sendResponse } from "../../utils/send.response";
import { MessageService } from "./message.service";

const createMessage = catchAsync(async (req, res) => {
  const result = await MessageService.createMessage(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "chat details found succesfully",
    data: result,
  });
});

export const MessageController = {
  createMessage,
};
