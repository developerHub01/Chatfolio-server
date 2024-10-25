import { Model } from "mongoose";
import { UserConstant } from "./user.constant";

export const genderTypesList: Array<string> = Object.values(UserConstant.GENDER_TYPES);

export type TGenderType = (typeof genderTypesList)[number];

export interface IUser {
  fullName: string;
  userName: string;
  email: string;
  bio: string;
  gender: "male" | "female";
  password: string;
  avatar: string;
}

export interface IUserChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IUserModel extends Model<IUser> {
  isPasswordMatch(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  createHash(str: string): Promise<string>;

  isUserExist(id: string): Promise<boolean>;

  updateUserPassword(
    payload: IUserChangePassword,
    userId: string,
  ): Promise<unknown>;
}
