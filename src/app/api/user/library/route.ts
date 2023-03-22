import prisma from "@/lib/Prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Drink } from "types/Types";

export async function GET(req: Request) {
  return new NextResponse("Ok hello");
}

//Drinks from API
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const UserId = session?.user.id;
  const { drink: newDrink }: { drink: Drink } = await req.json();

  console.log("posting:", newDrink.id);

  const drink = await prisma.drink.upsert({
    where: {
      id: newDrink.id,
    },
    update: {
      users: {
        connect: { id: UserId },
      },
    },
    create: {
      id: newDrink.id,
      name: newDrink.name,
      image: newDrink.image,
      users: {
        connect: { id: UserId },
      },
    },
    include: {
      users: true,
    },
  });
  return NextResponse.json({ drink });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const UserId = session?.user.id;
  const drinkId: number = await req.json();

  console.log("deleting:", drinkId);

  const drink = await prisma.drink.update({
    where: {
      id: String(drinkId),
    },
    data: {
      users: {
        disconnect: [{ id: UserId }],
      },
    },
    include: {
      users: true,
    },
  });

  // delete if in no ones library
  if (!drink.users.length) {
    await prisma.drink.delete({
      where: {
        id: String(drinkId),
      },
    });
  }
  return NextResponse.json({ drink });
}
