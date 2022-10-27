
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
        res.status(500);
    }

    if (req.method == 'POST') {
        console.log(JSON.stringify(req.body.drinkIngredients))

        const drink = {
            drinkName: req.body.drinkName,
            drinkThumb: req.body.drinkThumb,
            drinkInstructions: req.body.drinkInstructions,
            alcohol: JSON.parse(req.body.alcohol),
            userEmail: req.body.userEmail,
            drinkIngredients: JSON.stringify(req.body.drinkIngredients),
            drinkMeasures: JSON.stringify(req.body.drinkMeasures),
        };

        const user = await prisma.User.findUnique({
            where: {
                email: req.body.userEmail,
            },
            include: {
                drinks: true,
            }
        })
        const alreadyIncluded = user.drinks.find(element => {
            return (element.drinkName == drink.drinkName);
        });
        if (!alreadyIncluded) {
            try {
                const posted = await prisma.Drink.create({ data: drink })
                res.status(201).json(posted)
            } catch (err) {
                console.log(err);
                res.status(500);
            }
        } else {
            res.status(300).json('Already in library');
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
            res.status(500);
        }
    }

}