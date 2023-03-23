import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next/types";
import { Drink } from "types/Types";
import prisma from "../../../lib/Prisma";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user.id;

  if (req.method === "POST") {
    console.log("posting:", req.body.drink.id);
    const newDrink: Drink = req.body.drink;
    const drink = await prisma.drink.upsert({
      where: {
        id: newDrink.id,
      },
      update: {
        users: {
          connect: { id: userId },
        },
      },
      create: {
        id: newDrink.id,
        name: newDrink.name,
        image: newDrink.image,
        users: {
          connect: { id: userId },
        },
      },
      include: {
        users: true,
      },
    });

    res.status(201);
    res.json(drink);
  } else if (req.method === "DELETE") {
    console.log("deleting:", req.body);
    const drinkId: string = req.body;
    const drink = await prisma.drink.update({
      where: {
        id: drinkId,
      },
      data: {
        users: {
          disconnect: [{ id: userId }],
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
          id: drinkId,
        },
      });
    }
    res.status(200);
    res.json(drink);
  } else {
    res.status(500);
  }
};

export default handler;
