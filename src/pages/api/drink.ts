import prisma from "@/lib/Prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { CreatedDrink } from "types/Types";
import { NextApiRequest, NextApiResponse } from "next/types";

// User created drinks

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    let { category } = req.query;

    console.log("category", category);

    if (Array.isArray(category)) {
      category = category[0];
    }

    const drinks = category
      ? await prisma.createdDrink.findMany({
          where: { strCategory: category },
        })
      : { drinks: [] };

    res.status(200);
    res.json({ drinks: drinks });

    //
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const id = session?.user.id;

    const { drink: newDrink }: { drink: CreatedDrink } = req.body;

    console.log("posting:", newDrink);

    const drink = await prisma.createdDrink.create({
      data: {
        ...newDrink,
        userId: id,
      },
    });

    res.status(201);
    res.json(drink);
    //
  } else if (req.method === "DELETE") {
    // const session = await getServerSession(authOptions);
    // const id = session?.user.id;

    const drinkId: string = req.body;

    console.log("deleting:", drinkId);

    const drink = await prisma.createdDrink.delete({
      where: {
        idDrink: drinkId,
      },
    });

    res.status(200);
    res.json(drink);
  }
};

export default handler;
