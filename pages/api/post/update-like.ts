import type { NextApiRequest, NextApiResponse } from "next";
import { isAuth } from "../../../lib/auth";
import { isValidObjectId, Types } from "mongoose";
import { IUserProfile } from "../../../utils/types";
import Post from "../../../models/Post";

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
    const { postId } = req.query;
    if (!isValidObjectId(postId))
      return res.status(422).json({ error: "Invalid post id!" });

    const post = await Post.findById(postId).select("likes");

    if (!post) return res.status(404).json({ error: "Post not found!" });

    const oldLikes = post.likes || [];
    const likedBy = new Types.ObjectId(user.id);
    // unlike (or remove like)
    if (oldLikes.includes(likedBy)) {
      post.likes = oldLikes.filter(
        (like: Types.ObjectId) => like.toString() !== likedBy.toString()
      );
    }
    // add new like
    else {
      post.likes = [...oldLikes, likedBy];
    }

    await post.save();

    res.status(201).json({
      newLikes: post.likes.length,
    });
  }
}
