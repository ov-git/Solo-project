import cookie from 'cookie'

export default async function handler(req, res) {
    try {
        res.setHeader('Set-Cookie', cookie.serialize('DRINKZZ_ACCESS_TOKEN', null, {
            httpOnly: true,
            maxAge: -1,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        }))
        res.status(201).send("loggedout");

    } catch (err) {
        console.log(err)
        res.status(400).json("Logout error");
    }
}