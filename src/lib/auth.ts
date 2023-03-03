import jwt from "jsonwebtoken";
import prisma from "./Prisma";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";
import { User } from "types/Types";
import { Cookie } from "next-auth/core/lib/cookie";
import {
  RequestCookie,
  RequestCookies,
} from "next/dist/server/web/spec-extension/cookies";
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

// export const createJWT = (user: Partial<User>) => {
//   const iat = Math.floor(Date.now() / 1000);
//   const exp = iat + 60 * 60 * 24;

//   return new SignJWT({ payload: { id: user.id, email: user.email } })
//     .setProtectedHeader({ alg: "HS256", typ: "JWT" })
//     .setExpirationTime(exp)
//     .setIssuedAt(iat)
//     .setNotBefore(iat)
//     .sign(new TextEncoder().encode(process.env.SECRET_KEY));
// };

// export const validateJWT = async (jwt: string) => {
//   const { payload } = await jwtVerify(
//     jwt,
//     new TextEncoder().encode(process.env.SECRET_KEY)
//   );

//   return payload.payload;
// };

// export const getUserFromCookie = async (cookie: RequestCookies) => {
//   const jwt = cookie.get(process.env.COOKIE_NAME as string) as RequestCookie;

//   if (jwt) {
//     //@ts-ignore
//     const { id } = await validateJWT(jwt.value);
//     const user = await prisma.user.findUnique({
//       where: {
//         id,
//       },
//       include: {
//         drinks: true,
//       },
//     });
//     return user;
//   }

//   return null;
// };
