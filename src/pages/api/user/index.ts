import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
// import { validateJWT } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const jwt = req.cookies[process.env.COOKIE_NAME as string] || null;
  const session = await getServerSession(req, res, authOptions);
  const id = session?.user.id;
  if (id) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        drinks: true,
      },
    });
    res.status(200);
    res.json({ data: user });
    return;
  } else {
    res.status(200);
    res.json({ data: null });
  }
};

export default handler;
