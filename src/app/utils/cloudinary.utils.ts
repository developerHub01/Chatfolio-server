import { v2 as cloudinary } from "cloudinary";
import { CloudinaryConstant } from "../constants/cloudinary.constant";
import { IMediaFileDimension } from "../interface/interface";
import httpStatus from "http-status";
import AppError from "../errors/AppError";

const getFileIdList = (filePaths: Array<string>) =>
  filePaths.map((file) => {
    const tempFile = file;
    const urlPrefix = tempFile.split(
      CloudinaryConstant.UNIQNECT_ROOT_FOLDER_NAME,
    )[0];

    const fileName = file.split(urlPrefix).pop()?.split(".");
    fileName?.pop();

    if (!fileName) return "";

    return fileName.join(".");
  });

const uploadFile = async (
  filePath: string,
  cloudinaryMediaPath: string,
  dimension?: IMediaFileDimension,
) => {
  // Upload an image
  const imageData =
    (await cloudinary.uploader.upload(filePath, {
      folder: `/${CloudinaryConstant.UNIQNECT_ROOT_FOLDER_NAME}/${cloudinaryMediaPath}`,
      resource_type: "image",
    })) || {};

  const { public_id } = imageData;
  let { secure_url: url } = imageData;

  if (!public_id)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "something went wrong please try again",
    );

  url = cloudinary.url(public_id, {
    fetch_format: "auto", // when need it will convert into webp formate else what is sweetable for it
    quality: "auto",
    crop: "auto",
    gravity: "auto",
    width: dimension?.width || 500,
    height: dimension?.height || 500,
  });

  if (!url)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "something went wrong please try again",
    );

  return url;
};

const deleteFile = async (filePaths: Array<string>) => {
  filePaths = getFileIdList(filePaths);

  const result = await cloudinary.api.delete_resources(filePaths, {
    type: "upload",
    resource_type: "image",
  });

  const partial = result?.partial;

  return !partial;
};

export const CloudinaryUtils = { getFileIdList, uploadFile, deleteFile };
