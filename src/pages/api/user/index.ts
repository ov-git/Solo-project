import prisma from "@/lib/Prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //
  if (req.method !== "GET") {
    res.status(500).json({ message: "Invalid Method" });
    return;
  }

  try {
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
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export default handler;
