import mongoose, { Schema, Types } from "mongoose";
import type { IPost } from "../../shared/types/post.type";
import {
  AllowCommentsEnum,
  AvailabilityEnum,
} from "../../shared/enums/post.enum";

const postSchema = new Schema<IPost>(
  {
    content: {
      type: String,
      minLength: 2,
      maxLength: 500000,
      required: function (this: IPost): boolean {
        return !this.attachments || this.attachments.length === 0;
      },
    },
    attachments: {
      type: [String],
    },
    allowComments: {
      type: String,
      enum: Object.values(AllowCommentsEnum),
      default: AllowCommentsEnum.ALLOW,
    },
    availability: {
      type: String,
      enum: Object.values(AvailabilityEnum),
      default: AvailabilityEnum.PUBLIC,
    },
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
postSchema.index({ createdBy: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ frozenAt: 1 });

const PostModel =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default PostModel;
