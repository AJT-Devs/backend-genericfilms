import { listByUserReserve } from "../../models/reserve.js";

export default async function getListReserve(req, res, next) {
    try{
        const {id} = req.params;
        const result = await listByUserReserve(+id);

        return res.json({
            message: `Lista de reservas do usuário ID ${id}`,
            result
        });
    }catch (error) {
        next(error);
    }
}