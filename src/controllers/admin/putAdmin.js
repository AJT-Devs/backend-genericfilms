import { updateAdmin } from "../../models/admin.js"
import { adminValidator } from "../../models/admin.js";

export default async function putAdmin(req, res, next){
    try{
        const {id} = req.params;
        const admin = req.body;

        const {success, error, data} = adminValidator(admin, {name: true, email: true, cargo: true, password: true});
        if(!success){
            return res.status(400).json({
                message: "Erro ao validar os dados do administrador!",
                errors: error.flatten().fieldErrors
            });
        }

        const result = await updateAdmin(+id, data);
        return res.json({
            message: `Administrador atualizado com sucesso`,
            admin: result
        });

    } catch (error) {
        next(error);
    }
}
