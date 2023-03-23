import prisma from "@/lib/Prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    res.json(user);
    return;
  } else {
    res.status(200);
    res.json(null);
  }
};

export default handler;
