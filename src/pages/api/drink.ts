import prisma from "@/lib/Prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { CreatedDrink } from "types/Types";
import { NextApiRequest, NextApiResponse } from "next/types";

// User created drinks

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      let { category } = req.query;

      if (Array.isArray(category)) {
        category = category[0];
      }

      const drinks = category
        ? await prisma.createdDrink.findMany({
            where: { strCategory: category },
          })
        : { drinks: [] };

      res.status(200).json({ drinks });
    } catch (error) {
      res.status(500).json({ drinks: [], message: "Error fetching drinks" });
    }
    //
  } else if (req.method === "POST") {
    //
    try {
      const session = await getServerSession(req, res, authOptions);
      const id = session?.user.id;

      if (!id) {
        res.status(404).json({ message: "Invalid user details" });
        return;
      }

      const { drink: newDrink }: { drink: CreatedDrink } = req.body;

      console.log("posting:", newDrink);

      const drink = await prisma.createdDrink.create({
        data: {
          ...newDrink,
          userId: id,
        },
      });

      res.status(201).json(drink);
      //
    } catch (error) {
      res.status(500).json({ message: "Failed to create drink" });
    }
    //
  } else if (req.method === "DELETE") {
    // const session = await getServerSession(authOptions);
    // const id = session?.user.id;
    try {
      const drinkId: string = req.body;
      console.log("deleting:", drinkId);

      const drink = await prisma.createdDrink.delete({
        where: {
          idDrink: drinkId,
        },
      });

      res.status(200).json(drink);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to delete drink" });
    }
  } else {
    res.status(500).json({ message: "Invalid HTTP method" });
  }
};

export default handler;
