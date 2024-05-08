import { v2 as cloudinary } from "cloudinary";

export const deleteFileFromCloudinary = async (filePaths) => {
  if (!filePaths) return { success: false };

  console.log(filePaths);

  try {
    const { deleted } = await cloudinary.api.delete_resources(
      Array.isArray(filePaths) ? filePaths : [filePaths]
    );
    const deletedData = deleted;
    for (const key in deletedData)
      deletedData[key] = deletedData[key] === "deleted";

    return {
      data: deletedData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
