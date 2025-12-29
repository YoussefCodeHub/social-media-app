import CommentRepository from "./comment.repository";
import type { IComment } from "../../shared/types/comment.type";
import * as AppErrors from "../../shared/errors";
import { ICreateCommentDTO } from "./comment.dto";
import type { HydratedDocument, Types } from "mongoose";
import { uploadToS3 } from "../../utils/s3.util";

class CommentService {
  constructor(private readonly commentRepo: CommentRepository) {}

  async createComment(
    userId: Types.ObjectId,
    postId: string,
    data: ICreateCommentDTO,
    files?: Express.Multer.File[]
  ): Promise<HydratedDocument<IComment>> {
    const postObjectId = postId as unknown as Types.ObjectId;

    // Check if post exists and allows comments
    const post = await this.commentRepo.checkPostAllowsComments(postObjectId);
    if (!post) throw new AppErrors.NotFoundError("Post not found");
    if (post.allowComments === "DENY")
      throw new AppErrors.ValidationError(
        "Comments are not allowed on this post"
      );

    const commentData: Partial<IComment> = {
      createdBy: userId,
      postId: postObjectId,
    };

    // Add content if exists
    if (data.content) commentData.content = data.content;

    // Upload attachments to S3 if exist
    if (files && files.length > 0) {
      const uploadPromises = files.map(async (file) => {
        const key = `comments/${Date.now()}-${file.originalname}`;
        return await uploadToS3(file.buffer, key, file.mimetype);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      commentData.attachments = uploadedUrls;
    }

    // Validate that we have content or attachments
    if (
      !commentData.content &&
      (!commentData.attachments || commentData.attachments.length === 0)
    )
      throw new AppErrors.ValidationError(
        "Please provide content or attachments"
      );

    // Add tags if exist
    if (data.tags) {
      const tagsArray: string[] = Array.isArray(data.tags)
        ? data.tags
        : (data.tags as string).split(",").map((t: string) => t.trim());

      if (tagsArray.length > 0)
        commentData.tags = tagsArray.map(
          (tag: string) => tag as unknown as Types.ObjectId
        );
    }

    const comment = await this.commentRepo.create(commentData);

    // Populate the created comment
    const populatedComment = await this.commentRepo.findCommentById(
      comment._id
    );
    if (!populatedComment)
      throw new AppErrors.NotFoundError("Comment not found");

    return populatedComment;
  }

  async replyComment(
    userId: Types.ObjectId,
    postId: string,
    commentId: string,
    data: ICreateCommentDTO,
    files?: Express.Multer.File[]
  ): Promise<HydratedDocument<IComment>> {
    const postObjectId = postId as unknown as Types.ObjectId;
    const commentObjectId = commentId as unknown as Types.ObjectId;

    // Check if post exists and allows comments
    const post = await this.commentRepo.checkPostAllowsComments(postObjectId);
    if (!post) throw new AppErrors.NotFoundError("Post not found");
    if (post.allowComments === "DENY")
      throw new AppErrors.ValidationError(
        "Comments are not allowed on this post"
      );

    // Check if parent comment exists and belongs to the post
    const parentComment = await this.commentRepo.findById(commentObjectId);
    if (!parentComment) throw new AppErrors.NotFoundError("Comment not found");
    if (parentComment.postId.toString() !== postObjectId.toString())
      throw new AppErrors.ValidationError(
        "Comment does not belong to this post"
      );
    if (parentComment.frozenAt)
      throw new AppErrors.ValidationError("Cannot reply to frozen comment");

    const replyData: Partial<IComment> = {
      createdBy: userId,
      postId: postObjectId,
      commentId: commentObjectId,
    };

    // Add content if exists
    if (data.content) replyData.content = data.content;

    // Upload attachments to S3 if exist
    if (files && files.length > 0) {
      const uploadPromises = files.map(async (file) => {
        const key = `comments/${Date.now()}-${file.originalname}`;
        return await uploadToS3(file.buffer, key, file.mimetype);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      replyData.attachments = uploadedUrls;
    }

    // Validate that we have content or attachments
    if (
      !replyData.content &&
      (!replyData.attachments || replyData.attachments.length === 0)
    )
      throw new AppErrors.ValidationError(
        "Please provide content or attachments"
      );

    // Add tags if exist
    if (data.tags) {
      const tagsArray: string[] = Array.isArray(data.tags)
        ? data.tags
        : (data.tags as string).split(",").map((t: string) => t.trim());

      if (tagsArray.length > 0)
        replyData.tags = tagsArray.map(
          (tag: string) => tag as unknown as Types.ObjectId
        );
    }

    const reply = await this.commentRepo.create(replyData);

    // Populate the created reply
    const populatedReply = await this.commentRepo.findCommentById(reply._id);
    if (!populatedReply) throw new AppErrors.NotFoundError("Reply not found");

    return populatedReply;
  }
}

export default CommentService;
