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
        res.json({ error: "Invalid login" });
        return;
      }

      const validPassword = await validatePassword(password, user.password);

      if (validPassword) {
        res.status(200);
        res.json(user);
      } else {
        throw new Error("Invalid login");
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
