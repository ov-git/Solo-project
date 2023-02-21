import { NextApiRequest, NextApiResponse } from "next";
import { validateJWT } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const jwt = req.cookies[process.env.COOKIE_NAME as string] || null;

  if (jwt) {
    /* @ts-ignore */
    const { id } = await validateJWT(jwt);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        drinks: true,
      },
    });
    console.log(user);
    res.status(200);
    res.json({ data: user });
    return;
  } else {
    res.status(200);
    res.json({ data: null });
  }
};

export default handler;
