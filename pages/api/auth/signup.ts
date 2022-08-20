import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import { signupSchema, validateJoi } from "../../../utils/validator";

export default async function singup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // validate incoming data
    const validationError = validateJoi(signupSchema, req.body);
    if (validationError)
      return res.status(422).json({ error: validationError.message });

    try {
      await dbConnect();
      const alreadyUser = await User.findOne({ email: req.body.email });
      if (alreadyUser)
        return res.status(422).json({ error: "This email is already in use!" });

      const newUser = new User({ ...req.body });
      await newUser.save();

      res.json({ user: { name: newUser.name, email: newUser.email } });
    } catch (error) {
      res.json("error");
    }
  }
}

// const singup2: NextApiHandler = (req, res) => {};
