import jwt from "jsonwebtoken";
import { readByTokenSessionAdmin } from "../../../models/sessionAdmin.js";

export default async function alreadyLoggedAdmin(req, res) {
    try{
        const adminToken = req.headers["authorization"]?.split(" ")[1];
        
        if(!adminToken){
            return res.status(401).json({
                message: "Administrador não está logado!"
            });
        }

        const sessionAdmin = await readByTokenSessionAdmin(adminToken);

        if(!sessionAdmin){
            return res.status(401).json({
                message: "Administrador não está logado!"
            });
        }

     
        const SECRET = process.env.SECRET;
        
        const validToken = jwt.verify(adminToken, SECRET); 
        
                
        if(!validToken){
            return res.status(401).json({
                message: "Administrador não está logado!"
            });
        }
        
        if(sessionAdmin.token === adminToken){
            return res.status(200).json({
                message: "Administrador já está logado!",
            });
        }
        
        return res.status(401).json({
                message: "Administrador não está logado!"
            });
    } catch(error){
        return res.status(401).json({
                message: "Administrador não está logado!"
            });
    }
}