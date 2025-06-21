import { readByEmailAdmin } from "../../../models/admin.js";
import { readByTokenSessionAdmin } from "../../../models/sessionAdmin.js";
import { createSessionAdmin } from "../../../models/sessionAdmin.js";
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';

export default async function loginAdmin(req, res) {
    try{
        const {email, password} = req.body;

 
        const admin = await readByEmailAdmin(email);
        if(!admin){
            return res.status(401).json({
                message: "Email inválido!",
            });
        }

        


        const passwordValid = bycrypt.compareSync(password, admin.password);
        if(!passwordValid){
            return res.status(401).json({
                message: "Senha inválida!"
            });
        }

        const SECRET = process.env.SECRET;
        
        // const token = jwt.sign({admin},SECRET, {expiresIn: '30min'});
        const token = jwt.sign({admin},SECRET);
        // const refreshToken = jwt.sign({admin}, SECRET, {expiresIn: '90min'});

        const result = {
            idAdmin: admin.id,
            userAgent: req.headers['user-agent'],
            token: token,
            name: admin.name
        }
        

        await createSessionAdmin(result);

        // res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 60 * 1000 })
        // res.cookie('token', token, { httpOnly: true, sameSite: 'Lax', secure: false, maxAge: 30 * 60 * 1000 })
        return res.status(200).json({
            message: "Administrador logado com sucesso!",
            id: admin.id,
            token,
            name: admin.name
        });
    } catch(error){
        return res.status(400).json({
            message: "Erro ao autenticar administrador!",
            error: error.message || error
        });
    }
}

