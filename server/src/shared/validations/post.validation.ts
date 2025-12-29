import z from "zod";
import { AllowCommentsEnum, AvailabilityEnum } from "../enums/post.enum";
import * as postMessages from "../messages/post.messages";
import * as postConstants from "../constants/post.constant";

const postSchema = {
  content: z
    .string()
    .min(postConstants.CONTENT.MIN_LENGTH, postMessages.CONTENT.MIN)
    .max(postConstants.CONTENT.MAX_LENGTH, postMessages.CONTENT.MAX)
    .optional(),

  attachments: z
    .array(z.string())
    .max(postConstants.ATTACHMENTS.MAX_LENGTH, postMessages.ATTACHMENTS.MAX)
    .optional(),

  allowComments: z
    .enum(
      [AllowCommentsEnum.ALLOW, AllowCommentsEnum.DENY],
      postMessages.ALLOW_COMMENTS.INVALID
    )
    .default(AllowCommentsEnum.ALLOW),

  availability: z
    .enum(
      [
        AvailabilityEnum.PUBLIC,
        AvailabilityEnum.FRIENDS,
        AvailabilityEnum.ONLYME,
      ],
      postMessages.AVAILABILITY.INVALID
    )
    .default(AvailabilityEnum.PUBLIC),

  tags: z.string().transform(postConstants.TAGS.TRANSFORM).optional(),
  action: z
    .enum([postConstants.LIKES.ACTION.LIKE, postConstants.LIKES.ACTION.UNLIKE])
    .optional(),
  postId: z.string().regex(/^[0-9a-fA-F]{24}$/, postMessages.POST.INVALID_ID),
};

export default postSchema;
