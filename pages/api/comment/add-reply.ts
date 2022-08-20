import type { NextApiRequest, NextApiResponse } from "next";
import { commentValidationSchema, validateJoi } from "../../../utils/validator";
import { isAuth } from "../../../lib/auth";
import Comment from "../../../models/Comment";
import dbConnect from "../../../lib/db";
import Post from "../../../models/Post";
import { isValidObjectId, Types } from "mongoose";
import { IUserProfile } from "../../../utils/types";

type Data = {
  belongsTo: string;
  owner: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // add new comments
  if (req.method === "POST") {
    const session = await isAuth(req, res);
    const user = session?.user as IUserProfile;

    if (!user)
      return res.status(401).json({ error: "You are not authorized!" });

    // validate incoming data
    const validationError = validateJoi(commentValidationSchema, req.body);
    if (validationError)
      return res.status(422).json({ error: validationError.message });

    const { repliedTo } = req.body;

    // first find comment on which we want to add reply.
    if (!isValidObjectId(repliedTo))
      return res.status(422).json({ error: "Invalid comment id!" });

    const commentForReply = await Comment.findOne({
      _id: repliedTo,
      chiefComment: true,
    });
    if (!commentForReply)
      return res.status(404).json({ error: "Comment not found!" });

    const replyComment = new Comment({
      repliedTo: commentForReply._id,
      owner: user.id,
      content: req.body.content,
    });

    if (commentForReply.replies)
      commentForReply.replies = [...commentForReply.replies, replyComment.id];

    await commentForReply.save();
    await replyComment.save();

    const formatComment = (comment: any) => ({
      id: comment._id,
      owner: {
        id: user.id,
        name: user.name,
      },
      content: comment.content,
      likes: comment.likes.length,
      createdAt: comment.createdAt,
      chiefComment: comment.chiefComment,
      repliedTo: comment.repliedTo,
      likedByOwner: false,
    });

    res.status(201).json({
      comment: formatComment(replyComment),
    });
  }
}
