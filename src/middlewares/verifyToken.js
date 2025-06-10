import jwt from 'jsonwebtoken';

export default async function verifyToken(req, res, next){
    const token = req.headers["authorization"].split(" ")[1];
    
    if(!token){
        return res.status(401).json({message: "Acesso negado"});
    }

    try{
        const SECRET = process.env.SECRET;
        const result = jwt.verify(token, SECRET);
        res.status(200).json({result})
        // next();
    }catch(error){
        res.status(401).json({message:"Acesso negado"})
    }
}