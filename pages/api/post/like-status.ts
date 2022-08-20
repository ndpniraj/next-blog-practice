import { isValidObjectId } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAuth } from "../../../lib/auth";
import Post from "../../../models/Post";
import { getLikedBy } from "../../../utils/helper";
import { IUserProfile } from "../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await isAuth(req, res);
  const user = session?.user as IUserProfile;

  if (req.method === "GET") {
    const { postId } = req.query;
    if (!isValidObjectId(postId))
      return res.status(403).json({ error: "Invalid request!" });

    const post = await Post.findById(postId).select("likes");
    if (!post) return res.status(404).json({ error: "Post not found!" });

    if (!user)
      return res.json({
        likesCount: post.likes?.length || 0,
        likedByOwner: false,
      });

    res.json({
      likesCount: post.likes?.length,
      likedByOwner: getLikedBy(post.likes, user),
    });
  }

  if (req.method === "DELETE") {
  }
}
