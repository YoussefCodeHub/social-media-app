import type { Model, HydratedDocument, Types } from "mongoose";
import type { IComment } from "../../shared/types/comment.type";
import DatabaseRepository from "../../database/database.repository";

class CommentRepository extends DatabaseRepository<IComment> {
  constructor(model: Model<IComment>) {
    super(model);
  }

  findCommentById(
    id: Types.ObjectId
  ): Promise<HydratedDocument<IComment> | null> {
    return this.model
      .findById(id)
      .populate("createdBy", "firstName lastName profilePicture")
      .populate("tags", "firstName lastName profilePicture")
      .populate("postId", "_id")
      .exec();
  }

  async checkPostAllowsComments(
    postId: Types.ObjectId
  ): Promise<{ allowComments: string } | null> {
    const Post = this.model.db.model<{ allowComments: string }>("Post");
    return Post.findById(postId).select("allowComments").lean().exec();
  }
}

export default CommentRepository;
