import prisma from "@/lib/Prisma";
import { NextApiRequest, NextApiResponse } from "next/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { category } = req.query;

  console.log(category);

  const drinks = await prisma.createdDrink.findMany({
    where: { strCategory: category },
  });

  res.status(200);
  res.json({ drinks: drinks });
};

export default handler;
