import jwt from "jsonwebtoken";
import prisma from "./Prisma";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

export const validatePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (user) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.SECRET_KEY));
};

export const validateJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.SECRET_KEY)
  );

  return payload.payload;
};

export const getUserFromCookie = async (cookie) => {
  // console.log(cookie.get());
  const jwt = cookie.get(process.env.COOKIE_NAME);

  if (jwt) {
    const { id } = await validateJWT(jwt.value);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        drinks: true,
      },
    });
    return user;
  }

  return null;
};

export const validateRoute = (handler) => {
  return async (req, res) => {
    const token = req.cookies.DRINKZZ_ACCESS_TOKEN;
    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, SECRET_KEY);
        user = await prisma.User.findUnique({
          where: {
            id,
          },
        });

        if (!user) {
          return res.status(403).json("invalid!");
        }
      } catch (err) {
        res.status(401);
        return;
      }
      const filter = {
        name: user.name,
        email: user.email,
        image: user.image,
      };
      return handler(req, res, filter);
    }
    res.status(401);
    res.json({ error: "Not Authorizied" });
  };
};
