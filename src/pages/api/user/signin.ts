import { createJWT, validatePassword } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
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
        const jwt = await createJWT(user);
        res.setHeader(
          "Set-Cookie",
          serialize(process.env.COOKIE_NAME as string, jwt, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24,
          })
        );
        res.status(200);
        res.json({ name: user });
      } else {
        throw new Error("Invalid login");
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
