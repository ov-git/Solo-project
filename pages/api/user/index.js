import prisma from "../../../lib/prisma"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY


export default async function handler(req, res) {
    // Login
    if (req.method == 'POST') {

        try {
            const { email, password } = req.body;
            const user = await prisma.User.findUnique({
                where: {
                    email: email,
                },
            });

            const validatedPass = await bcrypt.compare(password, user.password);
            if (!validatedPass) throw new Error();
            // console.log(validatedPass)
            const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
            res.status(200).send({ accessToken });
        } catch (error) {
            res
                .status(401)
                .send({ error: '401', message: 'Username or password is incorrect' });
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

    function authLogin(a) {
        const header = a.headers['authorization'];
        console.log('header', header);
        const token = header && header.split(' ')[0];
        console.log('token', token);
    }

    // res.status(404).json('Invalid request');




}
