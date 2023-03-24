import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next/types";
import { Drink } from "types/Types";
import prisma from "../../../lib/Prisma";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //
    console.log("posting:", req.body.drink.id);
    try {
      const session = await getServerSession(req, res, authOptions);
      const userId = session?.user.id;
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
      });
      res.status(200).json(drink);
    } catch (error) {
      res.status(500).json({ message: "Adding failed" });
    }
  } else if (req.method === "DELETE") {
    //
    console.log("deleting:", req.body);
    try {
      const session = await getServerSession(req, res, authOptions);
      const userId = session?.user.id;
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
      res.status(200).json(drink);
    } catch (error) {
      res.status(500).json({ message: "Deleting failed" });
    }
  } else {
    res.status(500).json({ message: "Invalid method" });
  }
};

export default handler;
