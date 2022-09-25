import prisma from "../../../../lib/prisma"

export default async function handler(req, res) {

    try {
        const body = await prisma.User.create({ data: req.body })
        res.status(201).json(body);
    } catch (err) {
        console.log(err);
    }
}