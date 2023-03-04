import { NextApiRequest, NextApiResponse } from "next";
import { validatePassword } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user || !user.password) {
        res.status(401);
        throw new Error("User not found");
      }

      const validPassword = await validatePassword(password, user.password);

      if (validPassword) {
        res.status(200);
        res.json(user);
      } else {
        res.status(401);
        throw new Error("Incorrect password");
      }
    } catch (err) {
      console.log(err);
      res.json({ error: err });
      res.status(404);
    }
  } else {
    res.status(500);
    res.json({ message: "HTTP method not valid only POST Accepted" });
  }
};

export default handler;
