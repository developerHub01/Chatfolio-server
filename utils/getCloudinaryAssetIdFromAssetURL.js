const errorObj = {
  success: false,
};
export const getCloudinaryAssetIdFromAssetURL = (assetURL) => {
  if (!assetURL?.includes("cloudinary")) return errorObj;

  assetURL = assetURL.split(".");
  assetURL = assetURL[assetURL.length - 2];
  if (!assetURL) return errorObj;

  assetURL = assetURL.split("/");
  assetURL = assetURL[assetURL.length - 1];

  if (!assetURL) return errorObj;

  return {
    success: true,
    data: assetURL,
  };
};
