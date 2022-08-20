import { unstable_getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

import { authOptions } from "../auth/[...nextauth]";

import dbConnect from "../../../lib/db";
import cloudinary from "../../../lib/cloudinary";
import Post from "../../../models/Post";
import { PostModel, topics } from "../../../utils/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

type FormidablePromise = { fields: formidable.Fields; file: formidable.File };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ error: "You are not authorized for this task" });

    const { file, fields }: FormidablePromise = await readFile(req);
    const { title, content, slug, tags, meta, author, topic } = fields as {
      title: string;
      content: string;
      slug: string;
      tags: string;
      meta: string;
      author: string;
      topic: string;
    };

    if (!title.trim())
      return res.status(401).json({ error: "Title is missing!" });

    if (!content.trim())
      return res.status(401).json({ error: "Content is missing!" });

    if (!slug.trim())
      return res.status(401).json({ error: "Slug is missing!" });

    if (!meta.trim())
      return res.status(401).json({ error: "Meta is missing!" });

    if (!topic.trim())
      return res.status(401).json({ error: "Topic is missing!" });

    await dbConnect();

    const post = await Post.findOne({ slug });
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.title = title;
    post.content = content;
    post.meta = meta;
    post.topic = topic as topics;

    if (file) {
      const { url, public_id } = await cloudinary.uploader.upload(
        file.filepath
      );
      post.thumbnail = { url, public_id };
    }

    if (tags) post.tags = JSON.parse(tags);

    await post.save();

    res.status(201).json({
      ok: true,
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        slug: post.slug,
        meta: post.meta,
        thumbnail: post.thumbnail?.url,
        author: post.author,
        tags: post.tags,
        topic: post.topic,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const readFile = (req: NextApiRequest): Promise<FormidablePromise> => {
  const form = formidable();

  return new Promise((resolve, reject) => {
    form.parse(req, async function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, file: files.thumbnail as formidable.File });
    });
  });
};
