import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization.startsWith('Bearer ')) {
        return res.status(403).json({ error: "Formato do token inválido!" });
    }

    if (!authorization) {
        return res.status(403).json({ error: "Não Autorizado, AccessToken não informado!" })
    }

    const accessToken = authorization.split(' ')[1]

    if (!accessToken) {
        return res.status(403).json({ error: "Não Autorizado, Bearer com AccessToken não informado!" })
    }
    try {
        const result = jwt.verify(accessToken, process.env.SECRET)

        req.userLogged = {
            id: result.id,
            name: result.name,
            email: result.email,
            cpf: result.cpf,
            birthdate: result.birthdate,
            telNumber: result.telNumber
        }

        next()
    } catch (error) {
        if (error?.name === 'TokenExpiredError')
            return res.status(401).json({ error: "Não Autorizado, AccessToken Expirado!", errorType: "tokenExpired" })

        if (error?.name === 'JsonWebTokenError')
            return res.status(403).json({ error: "Não Autorizado, AccessToken Inválido!" })
    }


}