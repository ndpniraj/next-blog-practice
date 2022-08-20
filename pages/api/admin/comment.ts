import type { NextApiRequest, NextApiResponse } from "next";
import { isAuth } from "../../../lib/auth";
import Comment from "../../../models/Comment";
import { INewPostCommentResponse, IUserProfile } from "../../../utils/types";
import { formatOldComment } from "../comment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await isAuth(req, res);
  const user = session?.user as IUserProfile;

  if (!user || user.role !== "admin")
    return res.status(401).json({ error: "You are not authorized!" });

  if (req.method === "GET") {
    const { pageNo = "0", limit = "5" } = req.query as {
      pageNo: string;
      limit: string;
    };

    const comments = await Comment.find({ chiefComment: true })
      .skip(parseInt(pageNo) * parseInt(limit))
      .limit(parseInt(limit))
      .populate("belongsTo", "title slug -_id")
      .populate("owner", "name")
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

    res.json({
      comments: formattedComments,
    });
  }
}
