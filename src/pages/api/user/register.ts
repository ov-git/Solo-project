import { NextApiRequest, NextApiResponse } from "next";
import { User } from "types/Types";

import { hashPassword } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //
  if (req.method === "POST") {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
    return;
  }
  //
  try {
    const { email, password } = req.body.user;

    if (!email || !password) {
      res.status(404).json({ message: "Invalid request" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to register user" });
  }
};

export default handler;
