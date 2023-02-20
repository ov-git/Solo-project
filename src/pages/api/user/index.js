import { getUserFromCookie, validateJWT } from "../../../lib/auth";
import prisma from "../../../lib/Prisma";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const jwt = req.cookies[process.env.COOKIE_NAME];
    const { id } = await validateJWT(jwt);

    const drink = await prisma.drink.upsert({
      where: {
        name: req.body.name,
      },
      update: {
        users: {
          connect: { id: id },
        },
      },
      create: {
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        users: {
          connect: { id: id },
        },
      },
      include: {
        users: true,
      },
    });

    res.status(201);
    res.json({ message: drink });
  } else {
    res.status(200);
    res.json({ name: "Hello from index" });
  }
};

export default handler;
