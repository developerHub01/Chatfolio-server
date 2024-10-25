import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IChat {
  chatName: string;
  chatType: "personal" | "group" | "channel";
  members: Array<Types.ObjectId>;
  admin?: Types.ObjectId;
  isConnected: boolean;
}

export interface IChatModel extends Model<IChat> {
  createDummyMethod(text: IChat): Promise<TDocumentType<IChat>>;
}
