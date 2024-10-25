import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IMessagePreference {
  userId: Types.ObjectId;
  theme: "light" | "dark";
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
}

export interface IMessagePreferenceModel extends Model<IMessagePreference> {
  createDummyMethod(
    text: IMessagePreference,
  ): Promise<TDocumentType<IMessagePreference>>;
}
