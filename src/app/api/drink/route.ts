import prisma from "@/lib/Prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { CreatedDrink } from "types/Types";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");

  const drinks = category
    ? await prisma.createdDrink.findMany({
        where: { strCategory: category },
      })
    : { drinks: [] };

  return NextResponse.json({ drinks: drinks });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;

  const { drink: newDrink }: { drink: CreatedDrink } = await req.json();

  console.log("posting:", newDrink);

  const drink = await prisma.createdDrink.create({
    data: {
      ...newDrink,
      userId: id,
    },
  });

  return NextResponse.json(drink);
}

export async function DELETE(req: NextRequest) {
  // const session = await getServerSession(authOptions);
  // const id = session?.user.id;

  const drinkId: string = await req.json();

  console.log("deleting:", drinkId);

  const drink = await prisma.createdDrink.delete({
    where: {
      idDrink: drinkId,
    },
  });

  return NextResponse.json(drink);
}
