import JWT from "jsonwebtoken";


export default (req, res, next) => {
    if (req.method === 'OPTIONS') next()
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({ code: 'not-auth-token', data: '' })
        }
        const decodeData = JWT.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = decodeData
        next()
    } catch (error) {
        res.status(401).json({ code: 'not-valid-token', data: '' })
    }
}
