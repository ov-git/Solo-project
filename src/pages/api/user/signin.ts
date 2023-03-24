import { NextApiRequest, NextApiResponse } from "next";
import { validatePassword } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //
  if (req.method !== "POST") {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
  //
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({ message: "Invalid request" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.password) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const validPassword = await validatePassword(password, user.password);

    if (validPassword) {
      res.status(200);
      res.json(user);
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

export default handler;
