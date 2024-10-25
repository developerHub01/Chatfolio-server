import { CloudinaryUtils } from "../../utils/cloudinary.utils";
import { UserConstant } from "./user.constant";
import { TGenderType } from "./user.interface";

type TGenerateAvatarURL = (gender: TGenderType, userName: string) => string;

const generateAvatarURL: TGenerateAvatarURL = (gender, userName) => {
  const genderValue =
    gender === UserConstant.GENDER_TYPES.MALE ? "boy" : "girl";
  return `https://avatar.iran.liara.run/public/${genderValue}?username=${userName}`;
};

const updateUserAvatar = async (
  imagePath: string,
  cloudinaryMediaPath: string,
  isUpdating: boolean = false,
  previousImage?: string,
) => {
  if (isUpdating && previousImage)
    await CloudinaryUtils.deleteFile([previousImage]);

  return await CloudinaryUtils.uploadFile(imagePath, cloudinaryMediaPath, {
    width: UserConstant.USER_AVATAR_SIZE.WIDTH,
    height: UserConstant.USER_AVATAR_SIZE.HEIGHT,
  });
};

export const UserUtils = {
  generateAvatarURL,
  updateUserAvatar,
};
