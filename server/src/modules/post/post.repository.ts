import type { Model, HydratedDocument, Types } from "mongoose";
import type { IPost } from "../../shared/types/post.type";
import DatabaseRepository from "../../database/database.repository";

class PostRepository extends DatabaseRepository<IPost> {
  constructor(model: Model<IPost>) {
    super(model);
  }

  findPostById(id: Types.ObjectId): Promise<HydratedDocument<IPost> | null> {
    return this.model
      .findById(id)
      .populate("createdBy", "firstName lastName profilePicture")
      .populate("tags", "firstName lastName profilePicture")
      .exec();
  }

  findUserPosts(userId: Types.ObjectId): Promise<HydratedDocument<IPost>[]> {
    return this.model
      .find({ createdBy: userId, frozenAt: null })
      .populate("createdBy", "firstName lastName profilePicture")
      .sort({ createdAt: -1 })
      .exec();
  }

  async likePost(
    postId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<HydratedDocument<IPost> | null> {
    return this.model
      .findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true }
      )
      .populate("createdBy", "firstName lastName profilePicture")
      .exec();
  }

  async unlikePost(
    postId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<HydratedDocument<IPost> | null> {
    return this.model
      .findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true })
      .populate("createdBy", "firstName lastName profilePicture")
      .exec();
  }

  async updatePostWithPipeline(
    postId: Types.ObjectId,
    userId: Types.ObjectId,
    update: any[]
  ): Promise<HydratedDocument<IPost> | null> {
    const result = await this.model
      .findOneAndUpdate({ _id: postId, createdBy: userId }, update, {
        new: true,
        runValidators: true,
        updatePipeline: true,
      })
      .exec();

    if (!result) return null;

    return this.findPostById(postId);
  }

  async getPostsWithAvailability(
    userId: Types.ObjectId,
    availability?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ posts: HydratedDocument<IPost>[]; total: number }> {
    const skip = (page - 1) * limit;

    let filter: any = { frozenAt: null };

    if (availability) filter.availability = availability;

    const posts = await this.model
      .find(filter)
      .populate("createdBy", "firstName lastName profilePicture")
      .populate("tags", "firstName lastName profilePicture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    const total = await this.model.countDocuments(filter).exec();

    return { posts: posts as HydratedDocument<IPost>[], total };
  }
}

export default PostRepository;
