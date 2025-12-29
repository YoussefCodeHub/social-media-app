import * as postConstants from "../constants/post.constant";

export const CONTENT = {
  MIN: `Content must be at least ${postConstants.CONTENT.MIN_LENGTH} characters`,
  MAX: `Content must not exceed ${postConstants.CONTENT.MAX_LENGTH} characters`,
} as const;

export const ATTACHMENTS = {
  MAX: `You can upload a maximum of ${postConstants.ATTACHMENTS.MAX_LENGTH} attachments`,
} as const;

export const ALLOW_COMMENTS = {
  INVALID: "Allow comments must be either 'allow' or 'deny'",
} as const;

export const AVAILABILITY = {
  INVALID: "Availability must be 'public', 'friends', or 'onlyme'",
} as const;

export const CONTENT_OR_ATTACHMENTS = {
  REQUIRED: "Please provide content or attachments",
} as const;

export const TAGS = {
  MAX: `Tags cannot exceed ${postConstants.TAGS.MAX_LENGTH}`,
} as const;

export const LIKES = {
  ALREADY_LIKED: "You have already liked this post",
  NOT_LIKED: "You have not liked this post yet",
  SUCCESS: "Post liked successfully",
  UNLIKED: "Post unliked successfully",
} as const;

export const POST = {
  NOT_FOUND: "Post not found",
  UPDATED: "Post updated successfully",
  DELETED: "Post deleted successfully",
  INVALID_ID: "Invalid post ID",
} as const;
