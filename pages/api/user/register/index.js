import prisma from "../../../../lib/prisma"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY

export default async function handler(req, res) {

    // try {
    //     const body = await prisma.User.create({ data: req.body })
    //     res.status(201).json(body);
    // } catch (err) {
    //     console.log(err);
    // }
    if (req.method == 'POST') {
        const { email, password } = req.body;
        const user = await prisma.User.findUnique({
            where: {
                email: email,
            },
        });

        if (user)
            return res
                .status(409)
                .send({ error: '409', message: 'User already exists Error' });
        try {
            const hash = await bcrypt.hash(password, 10);
            const newUser = {
                ...req.body,
                password: hash,
            };

            const { _id } = await prisma.User.create({ data: newUser });
            const accessToken = jwt.sign({ _id }, SECRET_KEY);
            res.status(201).send({ newUser , accessToken });
        } catch (error) {
            res.status(400);
        }
    };
}