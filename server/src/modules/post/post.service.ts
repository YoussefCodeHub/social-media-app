import PostRepository from "./post.repository";
import type { IPost } from "../../shared/types/post.type";
import * as AppErrors from "../../shared/errors";
import { ICreatePostDTO, IGetPostsDTO, IUpdatePostDTO } from "./post.dto";
import type { HydratedDocument, Types } from "mongoose";
import { uploadToS3 } from "../../utils/s3.util";
import { AvailabilityEnum } from "../../shared/enums/post.enum";

class PostService {
  constructor(private readonly postRepo: PostRepository) {}

  async createPost(
    userId: Types.ObjectId,
    data: ICreatePostDTO,
    files?: Express.Multer.File[]
  ): Promise<HydratedDocument<IPost>> {
    const postData: Partial<IPost> = {
      createdBy: userId,
      allowComments: data.allowComments,
      availability: data.availability,
    };

    // Add content if exists
    if (data.content) postData.content = data.content;

    // Upload attachments to S3 if exist
    if (files && files.length > 0) {
      const uploadPromises = files.map(async (file) => {
        const key = `posts/${Date.now()}-${file.originalname}`;
        return await uploadToS3(file.buffer, key, file.mimetype);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      postData.attachments = uploadedUrls;
    }

    // Validate that we have content or attachments
    if (
      !postData.content &&
      (!postData.attachments || postData.attachments.length === 0)
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
        postData.tags = tagsArray.map(
          (tag: string) => tag as unknown as Types.ObjectId
        );
    }

    const post = await this.postRepo.create(postData);

    // Populate the created post
    const populatedPost = await this.postRepo.findPostById(post._id);
    if (!populatedPost) throw new AppErrors.NotFoundError("Post not found");

    return populatedPost;
  }
  async likeUnlikePost(
    userId: Types.ObjectId,
    postId: string,
    action: string
  ): Promise<HydratedDocument<IPost>> {
    const postObjectId = postId as unknown as Types.ObjectId;

    const post = await this.postRepo.findPostById(postObjectId);
    if (!post) throw new AppErrors.NotFoundError("Post not found");

    const hasLiked = post.likes?.some(
      (like) => like.toString() === userId.toString()
    );

    if (action === "LIKE") {
      if (hasLiked)
        throw new AppErrors.ValidationError("You have already liked this post");
      const updatedPost = await this.postRepo.likePost(postObjectId, userId);
      if (!updatedPost) throw new AppErrors.NotFoundError("Post not found");
      return updatedPost;
    } else {
      if (!hasLiked)
        throw new AppErrors.ValidationError("You have not liked this post yet");
      const updatedPost = await this.postRepo.unlikePost(postObjectId, userId);
      if (!updatedPost) throw new AppErrors.NotFoundError("Post not found");
      return updatedPost;
    }
  }

  async updatePost(
    userId: Types.ObjectId,
    postId: string,
    data: IUpdatePostDTO,
    files?: Express.Multer.File[]
  ): Promise<HydratedDocument<IPost>> {
    const postObjectId = postId as unknown as Types.ObjectId;

    const post = await this.postRepo.findPostById(postObjectId);
    if (!post) throw new AppErrors.NotFoundError("Post not found");
    if (post.createdBy?._id.toString() !== userId.toString()) {
      throw new AppErrors.AuthorizationError(
        "You are not authorized to update this post"
      );
    }

    const updateData: any[] = [{ $set: {} }];

    if (data.content) updateData[0].$set.content = data.content;
    if (data.allowComments)
      updateData[0].$set.allowComments = data.allowComments;
    if (data.availability) updateData[0].$set.availability = data.availability;

    if (files && files.length > 0) {
      const uploadPromises = files.map(async (file) => {
        const key = `posts/${Date.now()}-${file.originalname}`;
        return await uploadToS3(file.buffer, key, file.mimetype);
      });
      const uploadedUrls = await Promise.all(uploadPromises);
      updateData[0].$set.attachments = uploadedUrls;
    }

    if (data.tags) {
      const tagsArray: string[] = Array.isArray(data.tags)
        ? data.tags
        : (data.tags as string).split(",").map((t: string) => t.trim());
      updateData[0].$set.tags = tagsArray.map(
        (tag: string) => tag as unknown as Types.ObjectId
      );
    }

    const updatedPost = await this.postRepo.updatePostWithPipeline(
      postObjectId,
      userId,
      updateData
    );

    if (!updatedPost) throw new AppErrors.NotFoundError("Post not found");
    return updatedPost;
  }

  async getPosts(
    userId: Types.ObjectId,
    query: IGetPostsDTO
  ): Promise<{
    posts: HydratedDocument<IPost>[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const { posts, total } = await this.postRepo.getPostsWithAvailability(
      userId,
      query.availability,
      page,
      limit
    );

    return {
      posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export default PostService;
