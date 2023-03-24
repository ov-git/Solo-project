import prisma from "../../../lib/Prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

// Storing the user after google login

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //
  if (req.method !== "POST") {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
    return;
  }

  try {
    const { email, image, name, id } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      // New user
      const created = await prisma.user.create({
        data: {
          id,
          email,
          image,
          name,
        },
      });
      res.status(201).json(created);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

export default handler;
