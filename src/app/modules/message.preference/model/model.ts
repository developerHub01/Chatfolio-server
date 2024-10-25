import { model } from "mongoose";
import {
  IMessagePreference,
  IMessagePreferenceModel,
} from "../message.preference.interface";
import { MessagePreferenceConstant } from "../message.preference.constant";

/* message preference schema start ================== */
import messagePreferenceSchema from "./model.schema";
/* message preference schema end ================== */

/* message preference schema middleware start ================== */
import "./model.middleware";
/* message preference schema middleware end ================== */

/* message preference schema static methods start ================== */
import "./model.static.method";
/* message preference schema static methods end ================== */

export const MessageModel = model<IMessagePreference, IMessagePreferenceModel>(
  MessagePreferenceConstant.MESSAGE_PREFERENCE_COLLECTION_NAME,
  messagePreferenceSchema,
);
