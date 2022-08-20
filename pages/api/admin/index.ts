import type { NextApiRequest, NextApiResponse } from "next";
import { isAuth } from "../../../lib/auth";
import Comment from "../../../models/Comment";
import { INewPostCommentResponse, IUserProfile } from "../../../utils/types";
import { formatOldComment } from "../comment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const session = await isAuth(req, res);
  //   const user = session?.user as IUserProfile;

  //   if (!user || user.role !== "admin")
  //     return res.status(401).json({ error: "You are not authorized!" });

  if (req.method === "GET") {
    const { pageNo = "0", limit = "5" } = req.query as {
      pageNo: string;
      limit: string;
    };

    // const comments = await Comment.find({});
    res.json({ ok: true });

    // aggregate([
    //     {
    //       $lookup: {
    //         from: "Comment",
    //         localField: "owner",
    //         foreignField: "_id",
    //         as: "mostActive",
    //       },
    //     },
    //     {
    //       $match: { owner: "$owner" },
    //     },
    //     {
    //       $group: {
    //         _id: null,
    //         ratingAvg: {
    //           $sum: "$rating",
    //         },
    //         reviewCount: {
    //           $sum: 1,
    //         },
    //       },
    //     },
    //   ])
  }
}
