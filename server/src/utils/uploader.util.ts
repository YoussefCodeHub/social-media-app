import path from "path";
import fs from "fs";
import multer from "multer";
import type { FileFilterCallback, StorageEngine } from "multer";
import type { Request } from "express";
import uploadConfig from "../config/uploader.config";
import * as appErrors from "../shared/errors/index";

// File filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!uploadConfig.allowedFiles.includes(file.mimetype))
    return cb(
      new appErrors.ValidationError(
        "Invalid image format. Allowed: jpg, jpeg, png",
        { receivedType: file.mimetype }
      )
    );

  cb(null, true);
};

// Local Storage
const createLocalStorage = (folder: string): StorageEngine => {
  const uploadPath = path.join(
    process.cwd(),
    uploadConfig.local.uploadRoot,
    folder
  );

  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

  return multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
};

// Cloud Storage
const createCloudStorage = (): StorageEngine => multer.memoryStorage();

// Main Uploader
interface UploaderOptions {
  type?: "local" | "cloud";
  folder?: string;
}

const uploader = ({
  type = "local",
  folder = "general",
}: UploaderOptions = {}) => {
  const storage: StorageEngine =
    type === "cloud" ? createCloudStorage() : createLocalStorage(folder);

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: uploadConfig.maxSize },
  });
};

export default uploader;
