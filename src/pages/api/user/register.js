import { serialize } from "cookie";
import { createJWT, hashPassword, validatePassword } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await prisma.User.create({
        data: {
          email,
          password: await hashPassword(password),
        },
      });

      const jwt = await createJWT(user);

      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME, jwt, {
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
