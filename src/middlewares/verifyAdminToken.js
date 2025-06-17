import jwt from 'jsonwebtoken';
import { readByTokenSessionAdmin } from '../models/sessionAdmin.js';
import { readAdmin } from '../models/admin.js';

export default async function verifyAdminToken(req, res, next){
    
    // const token = req.cookies.token;

    if (!authorization) {
        return res.status(403).json({ error: "Não Autorizado, Token não informado!" })
    }

    if (!authorization.startsWith('Bearer ')) {
        return res.status(403).json({ error: "Formato do token inválido!" });
    }

    const token = req.headers["authorization"].split(" ")[1];
    
    if(!token){
        return res.status(401).json({token, message: "Token não fornecido!"});
    }

    try{
        const SECRET = process.env.SECRET;
        const validToken = jwt.verify(token, SECRET);
        
        if(!validToken){
            return res.status(401).json({message: "Token inválido!"});
        }
        const verifyToken = await readByTokenSessionAdmin(token);

        if(!verifyToken){
            return res.status(401).json({message: "Token inválido!"});
        }

        const admin = await readAdmin(verifyToken.idAdmin);
        if(!admin){
            return res.status(401).json({message: "Erro ao atualizar token!"});
        }
        // const refreshToken = jwt.sign({admin}, SECRET, {expiresIn: '30m'});

        // const result = await updateSessionAdmin(token, refreshToken);
        // if(!result){
        //     return res.status(401).json({message: "Erro ao atualizar token!"});
        // }

        
        // req.body.token = refreshToken;
        // // res.cookie('token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 60 * 1000 })
        // res.cookie('token', refreshToken, { httpOnly: true, sameSite: 'Lax', secure: false, maxAge: 30 * 60 * 1000 })
        next();
    }catch(error){
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({message: "Token expirado!"});
        }
        return res.status(401).json({message:"Acesso negado",});
    }
}