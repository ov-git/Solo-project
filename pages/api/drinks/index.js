
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {

    if (req.method == 'GET') {
        try {
            const body = await prisma.Drink.findMany();

            res.status(200)
                .json(body)
        } catch (err) {
            console.log(err);
        }
        res.status(404);
    }

    if (req.method == 'POST') {

        const drink = {
            name: req.body.drinkName,
            url: req.body.drinkThumb,
            instructions: req.body.drinkInstructions,
            alcohol: JSON.parse(req.body.alcohol),
            userEmail: req.body.userEmail,
        };

        try {
            const posted = await prisma.Drink.create({ data: drink })
            res.status(201).json(posted)
        } catch (err) {
            console.log(err);
        }
    }

    if (req.method == 'DELETE') {

        try {
            const deleted = await prisma.Drink.delete({
                where: {
                    id: req.body.id
                }
            })
            res.status(200).json(deleted)
        } catch (err) {
            console.log(err);
        }
    }

}

const getDrinks = async () => {

}