import { model } from "mongoose";
import { IMessage, IMessageModel } from "../message.interface";
import { MessageConstant } from "../message.constant";

/* message schema start ================== */
import messageSchema from "./model.schema";
/* message schema end ================== */

/* message schema middleware start ================== */
import "./model.middleware";
/* message schema middleware end ================== */

/* message schema static methods start ================== */
import "./model.static.method";
/* message schema static methods end ================== */

export const MessageModel = model<IMessage, IMessageModel>(
  MessageConstant.MESSAGE_COLLECTION_NAME,
  messageSchema,
);
