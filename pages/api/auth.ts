import type { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";

type Data = {
  //   username: string;
  //   password: string;
};
type Body = {
  username: string;
  password: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(404);
    return res.end("Error");
  }

  const { username, password } = JSON.parse(req.body);
  if (!username || !password) return res.status(404).send("Not found");

  if (username === process.env.user && password === process.env.pass) {
    const token = jwt.sign({ admin: true }, process.env.jwt_secret as Secret, {
      // expiresIn: "2h",
    });
    return res.status(200).json({ token });
  }

  return res.status(404).send("Not found");
}
