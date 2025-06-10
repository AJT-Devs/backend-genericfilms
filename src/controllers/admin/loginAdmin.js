import { authAdmin } from "../../models/admin.js";
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';

export default async function loginAdmin(req, res) {
    try{
        const {email, password} = req.body;
        password = bycrypt.compareSync(password,);
        const result = await authAdmin(email, password);
        const SECRET = process.env.SECRET;
        
        if(!result){
            return res.status(400).json({
                message: "Email ou senha inválidos!",
            });
        }

        const token = jwt.sign({result},SECRET);

        return res.status(200).json({
            message: "Administrador logado com sucesso!",
            token
        });
    } catch(error){
        return res.status(400).json({

            message: "Erro ao autenticar administrador!",
        });
    }
}