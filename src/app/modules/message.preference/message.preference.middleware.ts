import { imageUpload } from "../../utils/multer.image.upload";

const createOrUpdateMessagePreferenceImages = imageUpload.fields([
  {
    name: "images",
  },
]);

export const MessagePreferenceMiddleware = {
  createOrUpdateMessagePreferenceImages,
};
