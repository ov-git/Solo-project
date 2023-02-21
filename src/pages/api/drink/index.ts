import { NextApiRequest, NextApiResponse } from "next/types";
import { validateJWT } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const jwt = req.cookies[process.env.COOKIE_NAME as string] || null;
  /* @ts-ignore */
  const { id } = await validateJWT(jwt);

  if (req.method === "POST") {
    const drink = await prisma.drink.upsert({
      where: {
        id: req.body.id,
      },
      update: {
        users: {
          connect: { id: id },
        },
      },
      create: {
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        users: {
          connect: { id: id },
        },
      },
      include: {
        users: true,
      },
    });

    res.status(201);
    res.json({ message: drink });
  } else if (req.method === "DELETE") {
    console.log("req", req.body);
    const drink = await prisma.drink.update({
      where: {
        id: req.body,
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
          id: req.body,
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
