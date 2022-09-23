
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
    console.log(req.method);

    if (req.method == 'GET') {
        try {
            const body = await prisma.Drink.findMany({
                where: { userId: "cl8d8wdiz0037wsuk3mfzlc8d" }
            });

            res.status(200)
                .json(body)
        } catch (err) {
            console.log(err);
        }
    }

    if (req.method == 'POST') {
        
        const drink = {
            name: req.body.drinkName,
            url: req.body.drinkThumb,
            instructions: req.body.drinkInstructions,
            alcohol: JSON.parse(req.body.alcohol),
            userId: "cl8d8ywgi0055wsukse8wnvey",
        };

        try {    
            const posted = await prisma.Drink.create({ data: drink })
            res.status(201).json(posted)
        } catch (err) {
            console.log(err);
        }       
    }

}

const getDrinks = async () => {
    
}