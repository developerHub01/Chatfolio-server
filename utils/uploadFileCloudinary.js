import { v2 as cloudinary } from "cloudinary";
import {
  CHATFOLIO_CLOUDINARY_ROOT_FOLDER_NAME,
  CHAT_IMAGES_FOLDER_NAME,
  CHAT_VIDEOS_FOLDER_NAME,
  GROUP_CHANNEL_AVATAR_FOLDER_NAME,
  PROFILE_AVATAR_FOLDER_NAME,
  STORY_IMAGES_FOLDER_NAME,
  STORY_VIDEOS_FOLDER_NAME,
  WALLPAPER_IMAGES_FOLDER_NAME,
} from "../constants/constants.js";

const cloudinaryMediaPathList = [
  CHAT_IMAGES_FOLDER_NAME,
  CHAT_VIDEOS_FOLDER_NAME,
  GROUP_CHANNEL_AVATAR_FOLDER_NAME,
  PROFILE_AVATAR_FOLDER_NAME,
  STORY_IMAGES_FOLDER_NAME,
  STORY_VIDEOS_FOLDER_NAME,
  WALLPAPER_IMAGES_FOLDER_NAME,
];

export const uploadFileCloudinary = async (filePath, cloudinaryMediaPath) => {
  if (!cloudinaryMediaPathList.includes(cloudinaryMediaPath))
    cloudinaryMediaPath = UNTRACKED_FOLDER;
  try {
    const { secure_url } = await cloudinary.uploader.upload(filePath, {
      unique_filename: true,
      folder: `/${CHATFOLIO_CLOUDINARY_ROOT_FOLDER_NAME}/${cloudinaryMediaPath}`,
    });
    return {
      data: secure_url,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
