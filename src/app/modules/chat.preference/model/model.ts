import { model } from "mongoose";
import { IChatPreference, IChatPreferenceModel } from "../chat.interface";
import { ChatPreferenceConstant } from "../chat.constant";

/* chat preference schema start ================== */
import chatPreferenceSchema from "./model.schema";
/* chat preference schema end ================== */

/* chat preference schema middleware start ================== */
import "./model.middleware";
/* chat preference schema middleware end ================== */

/* chat preference schema static methods start ================== */
import "./model.static.method";
/* chat preference schema static methods end ================== */

export const ChatModel = model<IChatPreference, IChatPreferenceModel>(
  ChatPreferenceConstant.CHAT_PREFERENCE_COLLECTION_NAME,
  chatPreferenceSchema,
);
