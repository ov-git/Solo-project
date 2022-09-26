import prisma from "../../../lib/prisma"

export default async function handler(req, res) {

    if (req.method == 'GET') {

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

    res.status(404).json('Invalid request');

  


}
