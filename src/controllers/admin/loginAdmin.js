import { authAdmin } from "../../models/admin.js";
import jwt from 'jsonwebtoken';

export default async function loginAdmin(req, res) {
    try{
        const {email, password} = req.body;
        const result = await authAdmin(email, password);
        
        if(!result){
            return res.status(400).json({
                message: "Email ou senha inválidos!",
            });
        }

        const token = jwt.sign({result},SECRET);

        return res.status(200).json({
            message: "Administrador logado com sucesso!",
            token,
            header
        });
    } catch(error){
        return res.status(400).json({
            message: "Erro ao autenticar administrador!",
        });
    }
}