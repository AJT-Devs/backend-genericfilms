import jwt from 'jsonwebtoken';
import { readByTokenSessionAdmin } from '../models/admin.js';
import { readAdmin } from '../models/admin.js';
import { updateSessionAdmin } from '../models/admin.js';

export default async function verifyAdminToken(req, res, next){
    const token = req.cookies.token;
    // const token = req.headers["authorization"].split(" ")[1];
    
    if(!token){
        return res.status(401).json({message: "Token não fornecido!"});
    }

    try{
        const SECRET = process.env.SECRET;
        const validToken = jwt.verify(token, SECRET);
        if(!validToken){
            return res.status(401).json({message: "Token expirado!"});
        }

        const verifyToken = await readByTokenSessionAdmin(token);

        if(!verifyToken){
            return res.status(401).json({message: "Token inválido!"});
        }

        const admin = await readAdmin(verifyToken.idAdmin);
        if(!admin){
            return res.status(401).json({message: "Erro ao atualizar token!"});
        }
        const refreshToken = jwt.sign({admin}, SECRET, {expiresIn: '30m'});

        const result = await updateSessionAdmin(token, refreshToken);
        if(!result){
            return res.status(401).json({message: "Erro ao atualizar token!"});
        }

        
        req.body.token = refreshToken;
        res.cookie('token', refreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 30 * 60 * 1000 })

        next();
    }catch(error){
        return res.status(401).json({message:"Acesso negado"});
    }
}