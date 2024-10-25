import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IChatPreference {
  userId: Types.ObjectId;
  chatId: Types.ObjectId;
  wallpaper: string;
  wallpaperActive: boolean;
  wallpaperMode: "light" | "dark";
  wallpaperPosition:
    | "left-top"
    | "top"
    | "right-top"
    | "left"
    | "center"
    | "right"
    | "left-bottom"
    | "bottom"
    | "right-bottom";
  messagesNotification: boolean;
  callsNotification: boolean;
  notificationMessagesTone: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  notificationGroupsTone: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  isArchived: boolean;
  lastMessageAuthor: Types.ObjectId;
  lastMessage: string;
}

export interface IChatPreferenceModel extends Model<IChatPreference> {
  createDummyMethod(
    text: IChatPreference,
  ): Promise<TDocumentType<IChatPreference>>;
}
