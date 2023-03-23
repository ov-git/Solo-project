import prisma from "../../../lib/Prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Storing the user after google login

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, image, name, id } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        const created = await prisma.user.create({
          data: {
            id,
            email,
            image,
            name,
          },
        });
        res.status(201);
        res.json(created);
      } else {
        console.log("user", user);
        res.status(200);
        res.json(user);
      }
    } catch (err) {
      console.log(err);
      res.json({ error: err });
      res.status(404);
    }
  } else {
    res.status(500);
    res.json({ message: "HTTP method not valid only POST Accepted" });
  }
};

export default handler;
