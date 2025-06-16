import { updateAdmin } from "../../models/admin.js";
import { adminValidator } from "../../models/admin.js";
import { readAdmin } from "../../models/admin.js";
import bycrypt from 'bcrypt';

export default async function patchAdmin(req, res, next){
    try{
            const {id} = req.params;
            const data = req.body;

            const admin = await readAdmin(+id);

            const passwordValid = bycrypt.compareSync(data.password, admin.password);
            if(!passwordValid){
                return res.status(400).json({
                    message: "Senha incorreta!"
                });
            }

            admin.password = data.newPassword;

            const {success, error, data: adminValidated} = adminValidator(admin, {name: true, email: true, cargo: true, password: true});
            if(!success){
                return res.status(400).json({
                    message: "Erro ao validar os dados do administrador!",
                    errors: error.flatten().fieldErrors
                });
            }

            adminValidated.password = bycrypt.hashSync(adminValidated.password, 10);
    
            const result = await updateAdmin(+id,  adminValidated);
            return res.json({
                message: `Administrador atualizado com sucesso`,
                admin: result
            });
    
        } catch (error) {
            next(error);
        }
}
