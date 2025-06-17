import {removeReserve} from "../../models/reserve.js"
import { readReserve } from "../../models/reserve.js";

export default async function deleteReserve(req, res, next) {
    try{
        const {id} = req.params;

        const userId = req.userLogged.id;
        const cargo = req.userLogged.cargo;
        const oldReserve = await readReserve(+id);
        if( (oldReserve.idUser !== userId) && (cargo === null) ){
            return res.status(403).json({ message: "Você não tem permissão para acessar esta reserva" });
        }

        const result = await removeReserve(+id);

        return res.json({
            message: `Reserva ID ${id} excluída com sucesso`,
            reserve: result
        });

    }catch (error) {
        next(error);
    }
}
