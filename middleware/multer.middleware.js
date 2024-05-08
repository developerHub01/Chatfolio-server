import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadFile = (number, fieldName) => {
  if (number === "single") return upload.single(fieldName);
};
