
import { getAll } from "../../lib/ApiService";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {

    if (req.method == 'GET') {
        try {
            const body = await prisma.Drink.findMany();
            res.status(200)
                .json(body)

        } catch (err) {
            console.log(err);
        }
    }

    if (req.method == 'PUT') {
        const data = await prisma.User.update({
            where: {
                email: email
            },
            create: {

            }
        })
    }

    const User = {
        email: 'b@amail.com',
        name: 'b',
        // drinks: [{ "d" "d"}]
    }

}

const getDrinks = async () => {
    
}