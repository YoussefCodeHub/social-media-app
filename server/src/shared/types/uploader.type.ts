export interface LocalConfig {
  uploadRoot: string;
}

export interface CloudConfig {
  folder: string;
}

export interface UploadConfig {
  allowedFiles: string[];
  maxSize: number;
  local: LocalConfig;
  cloud: CloudConfig;
}
