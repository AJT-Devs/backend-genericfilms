import {removeReserve} from "../../models/reserve.js"

export default async function deleteReserve(req, res, next) {
    try{
        const {id} = req.params;

        const result = await removeReserve(+id);

        return res.json({
            message: `Reserva ID ${id} excluída com sucesso`,
            reserve: result
        });

    }catch (error) {
        next(error);
    }
}
