import prisma from "../../../lib/prisma"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY


export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await prisma.User.findUnique({
                where: {
                    email: email,
                },
            });

            const validated = await bcrypt.compare(password, user.password);
            if (validated) {
                const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
                res.status(200).send({ email },{ accessToken });                
            } 
        } catch (error) {
            res.status(400)
        }
    }

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
    // res.status(404).json('Invalid request');

}
