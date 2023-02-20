import { createJWT, validatePassword } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await prisma.User.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(401);
        res.json({ error: "Invalid login" });
        return;
      }

      const validPassword = await validatePassword(password, user.password);

      if (validPassword) {
        const jwt = await createJWT(user);
        res.setHeader(
          "Set-Cookie",
          serialize(process.env.COOKIE_NAME, jwt, {
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
