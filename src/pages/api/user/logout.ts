import { NextApiRequest, NextApiResponse } from "next/types";
import { serialize } from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const jwt = req.cookies[process.env.COOKIE_NAME as string] || null;
  console.log("logout");
  res.setHeader(
    "Set-Cookie",
    serialize(process.env.COOKIE_NAME as string, "", {
      httpOnly: true,
      path: "/",
      maxAge: -1,
    })
  );
  res.status(200);
  res.send({});
};

export default handler;
