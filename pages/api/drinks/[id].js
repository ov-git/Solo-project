
import prisma from "../../../lib/Prisma";

export default async function handler(req, res) {
    
    try {
        const body = await prisma.Drink.findMany({
            where: { userEmail: req.query.id }
        });

          res.status(200).json(body)
        } catch (err) {
            console.log(err);
        }
    
    res.status(404);
}