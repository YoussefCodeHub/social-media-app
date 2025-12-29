import * as commentConstants from "../constants/comment.constant";

export const CONTENT = {
  MIN: `Content must be at least ${commentConstants.CONTENT.MIN_LENGTH} characters`,
  MAX: `Content must not exceed ${commentConstants.CONTENT.MAX_LENGTH} characters`,
} as const;

export const ATTACHMENTS = {
  MAX: `You can upload a maximum of ${commentConstants.ATTACHMENTS.MAX_LENGTH} attachments`,
} as const;

export const CONTENT_OR_ATTACHMENTS = {
  REQUIRED: "Please provide content or attachments",
} as const;

export const TAGS = {
  MAX: `Tags cannot exceed ${commentConstants.TAGS.MAX_LENGTH}`,
} as const;

export const COMMENT = {
  NOT_FOUND: "Comment not found",
  CREATED: "Comment created successfully",
  INVALID_ID: "Invalid comment ID",
} as const;

export const POST = {
  INVALID_ID: "Invalid post ID",
  COMMENTS_NOT_ALLOWED: "Comments are not allowed on this post",
} as const;
