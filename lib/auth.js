import jwt from 'jsonwebtoken'
import prisma from './Prisma'
import { getSession } from 'next-auth/react'
const SECRET_KEY = process.env.SECRET_KEY



export const validateRoute = (handler) => {
    return async (req, res) => {
        const token = req.cookies.DRINKZZ_ACCESS_TOKEN;
        if (token) {
            let user;

            try {
                const { id } = jwt.verify(token, SECRET_KEY)
                 user = await prisma.User.findUnique({
                    where: {
                        id
                    },
                 })

                if (!user) {
                    return res.status(403).json('invalid!');
                }
            } catch (err) {
                res.status(401);
                return;
            }
            const filter = {
                name: user.name,
                email: user.email,
                image: user.image,
            }
            return handler(req, res, filter);
        }
        res.status(401)
        res.json({ error: 'Not Authorizied' })
    }
}