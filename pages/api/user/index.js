import prisma from "../../../lib/Prisma"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from "cookie";
const SECRET_KEY = process.env.SECRET_KEY


export default async function handler(req, res) {
    //login
    if (req.method == 'POST') {
        try {
            const { email, password } = req.body;
            const user = await prisma.User.findUnique({
                where: {
                    email: email,
                },
            });

            const validated = bcrypt.compare(password, user.password);
            if (user && validated) {
                const accessToken = jwt.sign({
                    email: user.email,
                    id: user.id,
                    time: Date.now(),
                }, SECRET_KEY, { expiresIn: "1h" });

                res.setHeader('Set-Cookie', cookie.serialize('DRINKZZ_ACCESS_TOKEN', accessToken, {
                    httpOnly: true,
                    maxAge: 1 * 60 * 60,
                    path: '/',
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production',
                }))             
                return res.status(200).send({ user });   
            } 

        } catch (error) {
            //wrong password
            res.status(401).send({ error: "Wrong" })
            return;
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
    res.status(404).json('Invalid request');

}
