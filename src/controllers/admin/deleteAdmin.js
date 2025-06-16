import { removeAdmin } from "../../models/admin.js";

export default async function deleteAdmin(req, res, next){
    try{
        const { id } = req.params;

        const result = await removeAdmin(+id);
        return res.json({
            message: `Admin ID ${id} deletado com sucesso`,
            admin: result
        });


    }catch(error){
        next(error);
    }
}
