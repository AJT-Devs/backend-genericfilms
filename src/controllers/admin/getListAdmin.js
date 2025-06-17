import { listAdmin } from "../../models/admin.js";

export default async function getListAdmin(req, res, next) {
    try{
        const result = await listAdmin();

        return res.status(200).json({
            message: "Lista de administradores obtida com sucesso!",
            admins: result
        });
    }catch (error) {
        next(error);
    }
}