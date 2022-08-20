import type { NextApiRequest, NextApiResponse } from "next";
import { isAuth } from "../../../lib/auth";
import Comment from "../../../models/Comment";
import { isValidObjectId, Types } from "mongoose";
import { formatOldComment } from ".";
import { IUserProfile } from "../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await isAuth(req, res);
    const user = session?.user as IUserProfile;
    if (!user)
      return res.status(401).json({ error: "You are not authorized!" });

    // find comment
    const { commentId } = req.query;
    if (!isValidObjectId(commentId))
      return res.status(422).json({ error: "Invalid comment id!" });

    const comment = await Comment.findById(commentId)
      .populate("owner")
      .populate({
        path: "replies",
        populate: {
          path: "owner",
          select: "name",
        },
        select: "createdAt likes content repliedTo",
      });
    if (!comment) return res.status(404).json({ error: "Comment not found!" });

    const oldLikes = comment.likes || [];
    const likedBy = new Types.ObjectId(user.id);
    // unlike (or remove like)
    if (oldLikes.includes(likedBy)) {
      comment.likes = oldLikes.filter(
        (like: Types.ObjectId) => like.toString() !== likedBy.toString()
      );
    }
    // add new like
    else {
      comment.likes = [...oldLikes, likedBy];
    }

    await comment.save();

    res.status(201).json({
      comment: {
        ...formatOldComment(comment, user),
      },
    });
  }
}
