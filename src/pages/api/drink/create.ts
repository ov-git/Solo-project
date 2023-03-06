import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/Prisma";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("here");
  const session = await getServerSession(req, res, authOptions);
  const id = session?.user.id;

  if (req.method === "POST") {
    console.log("posting:", req.body);
    const drink = await prisma.drink.create({
      data: {
        name: req.body.name,
        image: req.body.image,
        instructions: req.body.instructions,
        users: {
          connect: { id: id },
        },
      },
    });

    res.status(201);
    res.json(drink);
  } else if (req.method === "DELETE") {
    console.log("deleting:", req.body);
    const drink = await prisma.drink.update({
      where: {
        id: req.body.id,
      },
      data: {
        users: {
          disconnect: [{ id: id }],
        },
      },
      include: {
        users: true,
      },
    });

    // delete if in no ones library
    if (!drink.users.length) {
      const d = await prisma.drink.delete({
        where: {
          id: req.body.id,
        },
      });
    }
    res.status(200);
    res.json({ message: drink });
  } else {
    res.status(200);
  }
};

export default handler;
