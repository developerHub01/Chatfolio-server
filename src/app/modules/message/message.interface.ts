import { Model } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IMessage {
  fullName: string;
  userName: string;
  email: string;
  bio: string;
  gender: "male" | "female";
  password: string;
  avatar: string;
}

export interface IMessageModel extends Model<IMessage> {
  createDummyMethod(text: IMessage): Promise<TDocumentType<IMessage>>;
}
