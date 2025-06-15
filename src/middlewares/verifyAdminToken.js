import jwt from 'jsonwebtoken';
import { readByTokenSessionAdmin } from '../models/admin.js';

export default async function verifyToken(req, res, next){
    const token = req.cookies.token;
    // const token = req.headers["authorization"].split(" ")[1];
    
    if(!token){
        return res.status(401).json({message: "Token não fornecido!"});
    }

    try{
        const SECRET = process.env.SECRET;
        jwt.verify(token, SECRET);
        const result = await readByTokenSessionAdmin(token);

        if(!result){
            return res.status(401).json({message: "Token inválido!"});
        }

        res.status(200).json({message: "Token válido!"});
        // next();
    }catch(error){
        res.status(401).json({message:"Acesso negado"})
    }
}