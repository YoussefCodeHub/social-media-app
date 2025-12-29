import type { RefinementCtx } from "zod";
import * as postMessages from "../messages/post.messages";

const postRefine = (
  data: Record<string, unknown>,
  ctx: RefinementCtx,
  hasFiles?: boolean
) => {
  if (
    !data.content &&
    (!data.attachments || (data.attachments as unknown[]).length === 0) &&
    !hasFiles
  ) {
    ctx.addIssue({
      code: "custom",
      message: postMessages.CONTENT_OR_ATTACHMENTS.REQUIRED,
      path: ["content"],
    });
  }
};

export default postRefine;
