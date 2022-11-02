import prisma from "../../../lib/Prisma"
import bcrypt from 'bcrypt';
import cookie from "cookie";
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY

export default async function handler(req, res) {

    if (req.method == 'POST') {
        const salt = bcrypt.genSaltSync();
        const { email, password } = req.body;
        
        try {
            const hash = bcrypt.hashSync(password, salt);
            const newUser = {
                ...req.body,
                password: hash,
            };

            const user = await prisma.User.create({ data: newUser });
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

            res.status(201).send({ user });
        } catch (error) {
            res.status(401).send({ error: '401', message: 'User already exists Error' });
        }
    };
    res.status(404);
}