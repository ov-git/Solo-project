import prisma from "../../../lib/prisma"

export default async function handler(req, res) {

    try {
        const body = await prisma.User.findMany({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        });
        res.status(200).json(body)
    } catch (err) {
        console.log(err);
        res.status(500);
    }


}
