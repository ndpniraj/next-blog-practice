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

  // add new comments
  if (req.method === "POST") {
  }

  // edit old comments
  if (req.method === "PATCH") {
  }

  // read comments
  if (req.method === "GET") {
    const { find, postId } = req.query;
    if (find === "isLikedByOwner" && !user)
      return res.status(403).json({ error: "Invalid request!" });

    if (!isValidObjectId(postId))
      return res.status(403).json({ error: "Invalid request!" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Invalid request!" });

    const likedByOwner = getLikedBy(post.likes, user);
    res.json({ likedByOwner });
  }

  if (req.method === "DELETE") {
  }
}
