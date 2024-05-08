import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import UserPreferences from "../models/user.preferences.model.js";
import { uploadFileCloudinary } from "../utils/uploadFileCloudinary.js";
import {
  CHATFOLIO_CLOUDINARY_ROOT_FOLDER_NAME,
  PROFILE_AVATAR_FOLDER_NAME,
  WALLPAPER_IMAGES_FOLDER_NAME,
} from "../constants/constants.js";
import { deleteFileFromCloudinary } from "../utils/deleteFileFromCloudinary.js";
import { getCloudinaryAssetIdFromAssetURL } from "../utils/getCloudinaryAssetIdFromAssetURL.js";

const deleteImageFromCloudinary = async (
  documentBeforeUpdate,
  fieldName,
  imageFolderInCloudinary
) => {
  const previousFieldDetails = getCloudinaryAssetIdFromAssetURL(
    documentBeforeUpdate[fieldName]
  );

  // If previously avatar exist in user then delete it
  if (previousFieldDetails?.success) {
    await deleteFileFromCloudinary(
      `${CHATFOLIO_CLOUDINARY_ROOT_FOLDER_NAME}/${imageFolderInCloudinary}/${previousFieldDetails?.data}` ||
        ""
    );
  }
};

export const isLoggedIn = async (req, res, next) => {
  if (!req.user || !req?.user?.id)
    next(errorHandler(401, "You are not logged in"));

  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (!user) return next(errorHandler(401, "You are not logged in"));

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUserInfo = async (req, res, next) => {
  let { fullName, bio, userName, avatar } = req.body;
  const { id } = req?.user;

  if (!id) return next(errorHandler(401, "You are not logged in"));

  const filePath = req?.file?.path;

  // get user before new image upload
  const userBeforeUpdate = await User.findById(id);
  if (!userBeforeUpdate) return next();

  // if there any image in "form body"
  if (filePath) {
    // uploading new images in cloudinary
    const { success, data, message } = await uploadFileCloudinary(
      filePath,
      PROFILE_AVATAR_FOLDER_NAME
    );
    if (!success) return next(errorHandler(500, message));

    // Delete previous image after new avatar saved
    deleteImageFromCloudinary(
      userBeforeUpdate,
      "avatar",
      PROFILE_AVATAR_FOLDER_NAME
    );

    avatar = data;
  }

  if (typeof avatar === "string" && avatar.trim() === "") {
    deleteImageFromCloudinary(
      userBeforeUpdate,
      "avatar",
      PROFILE_AVATAR_FOLDER_NAME
    );
  }

  const updateObj = {
    fullName,
    userName,
    bio,
    avatar,
  };

  Object.entries(updateObj).forEach(
    ([key, value]) =>
      value !== undefined && value !== null && (updateObj[key] = value)
  );

  try {
    const userData = await User.findByIdAndUpdate(
      id,
      {
        ...updateObj,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    return next(error);
  }
};

export const getPreferencesData = async (req, res, next) => {
  if (!req.user || !req?.user?.id)
    next(errorHandler(401, "You are not logged in"));

  const { id } = req.user;

  try {
    const userPreferences = await UserPreferences.findOne({
      userId: id,
    });
    if (!userPreferences)
      return next(errorHandler(404, "Preferences not found"));
    return res.status(200).json({
      data: userPreferences,
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

export const updatePreferencesData = async (req, res, next) => {
  const { id: userId } = req?.user;

  // If use is not logged in
  if (!userId) return next(errorHandler(401, "You are not logged in"));

  const filePath = req?.file?.path;
  let wallpaper = null;

  // get userPreferences before new image upload
  const userPreferences = await UserPreferences.findOne({
    userId,
  });
  if (!userPreferences) return next();

  // if there any image in body
  if (filePath) {
    // uploading new images in cloudinary
    const { success, data, message } = await uploadFileCloudinary(
      filePath,
      WALLPAPER_IMAGES_FOLDER_NAME
    );
    if (!success) return next(errorHandler(500, message));

    // Delete previous image after new wallpaper saved
    deleteImageFromCloudinary(
      userPreferences,
      "wallpaper",
      WALLPAPER_IMAGES_FOLDER_NAME
    );

    wallpaper = data;
  }

  const {
    theme,
    wallpaperActive,
    wallpaperMode,
    wallpaperPosition,
    messagesNotification,
    callsNotification,
    notificationMessagesTone,
    notificationGroupsTone,
  } = req.body;

  const userPreferencesList = {
    theme,
    wallpaper,
    wallpaperActive,
    wallpaperMode,
    wallpaperPosition,
    messagesNotification,
    callsNotification,
    notificationMessagesTone,
    notificationGroupsTone,
  };
  const dataToUpdate = {};

  Object.entries(userPreferencesList).forEach(
    ([key, value]) =>
      value !== undefined && value !== null && (dataToUpdate[key] = value)
  );

  console.log(dataToUpdate);

  try {
    const updatedData = await UserPreferences.findOneAndUpdate(
      {
        userId,
      },
      {
        ...dataToUpdate,
      },
      { new: true }
    );

    console.log(updatedData);

    if (!updatedData) return next();

    return res.status(200).json({
      success: true,
      data: updatedData,
    });
  } catch (error) {
    return next(error);
  }
};
