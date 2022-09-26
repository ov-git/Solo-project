import { prisma } from "@prisma/client";

export default async function handler(req, res) {

    if (req.method == 'POST') {

        try {
            // console.log(req.body.drinkz)
            const list = await prisma.DrinkList.create({
                data: {
                    name: req.body.name,
                    drinkz: JSON.stringify(req.body.drinkz),
                }
            });
        } catch (err) {
            console.log(err);
        }

        // try {
        //     const body = await prisma.Drink.create({
        //         data: {
        //             listName: 'name',
        //             drinkz: req.body.drinkz,
        //         }
        //         });            
        //     res.status(200).json(body)
        // } catch (err) {
        //     console.log(err);
        //     res.status(500);
        // }
    }

    res.status(404);
}