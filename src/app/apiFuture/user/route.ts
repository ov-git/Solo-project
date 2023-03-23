import prisma from "@/lib/Prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
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
    return NextResponse.json(user);
  }
}
