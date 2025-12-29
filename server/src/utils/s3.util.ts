import s3 from "../config/s3.config";
import {
  PutObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";

export const uploadToS3 = async (
  buffer: Buffer,
  key: string,
  mimetype: string
): Promise<string> => {
  const params: PutObjectCommandInput = {
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  // Return the S3 URL
  const s3Url = `https://${process.env.BUCKET_NAME!}.s3.${process.env
    .REGION!}.amazonaws.com/${key}`;
  return s3Url;
};

export const deleteFromS3 = async (key: string): Promise<void> => {
  const params: DeleteObjectCommandInput = {
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};
