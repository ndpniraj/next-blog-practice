import type { NextApiRequest, NextApiResponse } from "next";
import {
  commentValidationSchema,
  updateCommentSchema,
  validateJoi,
} from "../../../utils/validator";
import { isAuth } from "../../../lib/auth";
import Comment, { IComment } from "../../../models/Comment";
import dbConnect from "../../../lib/db";
import Post from "../../../models/Post";
import { isValidObjectId } from "mongoose";
import { INewPostCommentResponse, IUserProfile } from "../../../utils/types";

const getLikedBy = (likes: any, user: IUserProfile) =>
  !user ? false : likes.includes(user.id);

export const formatOldComment = (
  comment: any,
  user: IUserProfile
): INewPostCommentResponse => {
  return {
    id: comment._id,
    content: comment.content,
    likes: comment.likes?.length,
    chiefComment: comment.chiefComment,
    belongsTo: comment.belongsTo,
    repliedTo: comment.repliedTo,
    likedByOwner: getLikedBy(comment.likes, user),
    owner: { id: comment.owner.id, name: comment.owner.name },
    createdAt: comment.createdAt,
  };
};

export const formatNewComment = (
  comment: any,
  user: IUserProfile
): INewPostCommentResponse => {
  return {
    id: comment._id,
    content: comment.content,
    likes: comment.likes?.length,
    chiefComment: comment.chiefComment,
    belongsTo: comment.belongsTo,
    repliedTo: comment.repliedTo,
    likedByOwner: getLikedBy(comment.likes, user),
    owner: { id: user.id, name: user.name },
    createdAt: comment.createdAt,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await isAuth(req, res);
  const user = session?.user as IUserProfile;

  // add new comments
  if (req.method === "POST") {
    if (!user)
      return res.status(401).json({ error: "You are not authorized!" });

    // validate incoming data
    const validationError = validateJoi(commentValidationSchema, req.body);
    if (validationError)
      return res.status(422).json({ error: validationError.message });

    await dbConnect();
    const post = await Post.findById(req.body.belongsTo);
    if (!post) return res.status(401).json({ error: "Invalid post!" });

    const comment = new Comment({
      ...req.body,
      owner: user.id,
      chiefComment: true,
    });
    await comment.save();

    res.status(201).json({
      comment: formatNewComment(comment, user),
    });
  }

  // edit old comments
  if (req.method === "PATCH") {
    if (!user)
      return res.status(401).json({ error: "You are not authorized!" });

    // validate incoming data
    const validationError = validateJoi(updateCommentSchema, req.body);
    if (validationError)
      return res.status(422).json({ error: validationError.message });

    const { commentId } = req.query;
    if (!commentId || !isValidObjectId(commentId))
      return res.status(422).json({ error: "Invalid request!" });

    const comment = await Comment.findOne({ _id: commentId, owner: user.id });
    if (!comment) return res.status(404).json({ error: "Comment not found!" });

    comment.content = req.body.content;
    await comment.save();
    res.status(201).json({ comment: formatOldComment(comment, user) });
  }

  // read comments
  if (req.method === "GET") {
    const comments = await Comment.find({
      belongsTo: req.query.postId,
    })
      .populate("owner")
      .populate({
        path: "replies",
        populate: {
          path: "owner",
          select: "name",
        },
        select: "createdAt likes content repliedTo",
      });

    const formattedComments: INewPostCommentResponse[] = comments.map(
      (comment) => ({
        ...formatOldComment(comment, user),
        replies: comment.replies?.map((item: any) =>
          formatOldComment(item, user)
        ),
      })
    );

    res.json({ comments: formattedComments });
  }

  if (req.method === "DELETE") {
    if (!user)
      return res.status(401).json({ error: "You are not authorized!" });

    const { commentId } = req.query;
    const comment = await Comment.findOne({ _id: commentId, owner: user.id });
    if (!comment) return res.status(404).json({ error: "Comment not found!" });

    // if chief comment remove other related comments as well.
    if (comment.chiefComment) {
      await Comment.deleteMany({ repliedTo: commentId });
    }
    // if this is the reply comment remove from the chiefComments replies section
    else {
      // finding chiefComment or parent comment
      const chiefComment = await Comment.findById(comment.repliedTo);
      if (chiefComment?.replies) {
        chiefComment.replies = chiefComment.replies.filter(
          (cId: any) => cId.toString() !== commentId
        );
      }
      await chiefComment?.save();
    }

    // removing the actual comment
    await Comment.findByIdAndDelete(commentId);
    res.json({ removed: true });
  }
}
