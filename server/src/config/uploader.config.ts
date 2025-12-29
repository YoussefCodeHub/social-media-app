import type {
  UploadConfig,
  LocalConfig,
  CloudConfig,
} from "../shared/types/uploader.type";

const uploadConfig: UploadConfig = {
  allowedFiles: ["image/jpeg", "image/png"],

  maxSize: 2 * 1024 * 1024, // 2MB

  local: {
    uploadRoot: "uploads",
  },

  cloud: {
    folder: "uploads",
  },
};

export default uploadConfig;
