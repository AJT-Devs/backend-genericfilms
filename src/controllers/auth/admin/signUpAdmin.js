import { adminValidator } from '../../../models/admin.js';
import { createAdmin } from '../../../models/admin.js';
import bcrypt from 'bcrypt';

export default async function signUpAdmin(req, res, next){
    try{
        const admin = req.body;
        const { success, error, data } = adminValidator(admin, { id: true });

        if(!success){
            return res.status(400).json({
                message: "Erro ao validar os dados do administrador!",
                errors: error.flatten().fieldErrors
            });
        }

        data.password = bcrypt.hashSync(data.password, 10);

        const result = await createAdmin(data);

        return res.status(201).json({
            message: 'Administrador cadastrado com sucesso',
            admin: result
        });
    }catch(error){
        if(error?.code === "P2002" && error?.meta?.target === "email"){
            return res.status(400).json({
                message: "Erro ao cadasrtrar administrador!",
                errors: {
                    email: ["Email já cadastrado!"]
                }
            });
        }
        next(error);
    }
}

