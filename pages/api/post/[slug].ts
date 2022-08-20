import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import Post from "../../../models/Post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getPost(req, res);
      break;
    default:
      res.status(404).json({ error: "Route not found!" });
      break;
  }
}

const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    if (!slug) return res.status(401).json({ error: "Invalid post slug!" });

    await dbConnect();
    const post = await Post.findOne({ slug });
    if (!post) return res.status(404).json({ error: "Post not found!" });

    res.json({
      post: {
        id: post._id.toString(),
        author: post.author || "",
        thumbnail: post.thumbnail?.url || "",
        title: post.title,
        content: post.content,
        date: post.createdAt.toString(),
        tags: post.tags,
        meta: post.meta,
        slug: post.slug,
        topic: post.topic || "",
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
