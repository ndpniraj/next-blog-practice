import type { NextApiRequest, NextApiResponse } from "next";
import jwt, {
  JwtPayload,
  Secret,
  decode,
  TokenExpiredError,
} from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(404);
    return res.end("Error");
  }

  const { authorization } = req.headers;

  if (typeof authorization !== "string") {
    res.status(403);
    res.end("Error");
    return;
  }

  try {
    const decode = jwt.verify(
      authorization as string,
      process.env.jwt_secret as Secret
    ) as JwtPayload;

    if (!decode || (!decode.admin as boolean))
      return res.status(403).send("Oops something went wrong!");

    res.status(200).json({ isAuth: true });
  } catch (error) {
    console.log(error);

    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ isAuth: false });
    }
    res.status(403).send("Oops something went wrong!");
  }
}
