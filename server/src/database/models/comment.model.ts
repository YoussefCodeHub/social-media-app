import mongoose, { Schema, Types } from "mongoose";
import type { IComment } from "../../shared/types/comment.type";

const CommentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      minLength: 2,
      maxLength: 50000,
      required: function (this: IComment): boolean {
        return !this.attachments || this.attachments.length === 0;
      },
    },
    attachments: {
      type: [String],
    },
    commentId: { type: Schema.Types.ObjectId, ref: "User" },

    postId: { type: Schema.Types.ObjectId, required: true, ref: "Post" },

    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    frozenBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    frozenAt: {
      type: Date,
    },
    restoredBy: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
CommentSchema.index({ createdBy: 1 });
CommentSchema.index({ createdAt: -1 });
CommentSchema.index({ frozenAt: 1 });

const CommentModel =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;
