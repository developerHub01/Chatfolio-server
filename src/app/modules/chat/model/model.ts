import { ChatConstant } from "../chat.constant";
import { IChat, IChatModel } from "../chat.interface";
import { model } from "mongoose";

/* chat schema start ================== */
import chatSchema from "./model.schema";
/* chat schema end ================== */

/* chat schema middleware start ================== */
import "./model.middleware";
/* chat schema middleware end ================== */

/* chat schema static methods start ================== */
import "./model.static.method";
/* chat schema static methods end ================== */

export const ChatModel = model<IChat, IChatModel>(
  ChatConstant.CHAT_COLLECTION_NAME,
  chatSchema,
);
