import type { NextApiRequest, NextApiResponse } from "next";
import { isAuth } from "../../../lib/auth";
import User from "../../../models/User";
import { IUserProfile } from "../../../utils/types";

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

    const users = await User.find({ role: "user" })
      .sort({ createdAt: -1 })
      .skip(parseInt(pageNo) * parseInt(limit))
      .limit(parseInt(limit))
      .select("name email");

    res.json({
      users: users.map(({ _id, name, email }) => ({ id: _id, name, email })),
    });
  }
}
