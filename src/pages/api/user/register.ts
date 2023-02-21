import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { createJWT, hashPassword, validatePassword } from "../../../lib/auth";
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

      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24,
        })
      );

      res.status(201);
      res.json({ name: user });
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
