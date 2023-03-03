import prisma from "./Prisma";
import bcrypt from "bcrypt";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const validatePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const getUserSession = async () => {
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
    return user;
  } else {
    return null;
  }
};
