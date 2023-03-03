import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.create({
        data: {
          email,
          password: await hashPassword(password),
        },
      });

      res.status(201);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(404);
    }
  }
  res.status(500).json({ message: "HTTP method not valid only POST Accepted" });
};

export default handler;
