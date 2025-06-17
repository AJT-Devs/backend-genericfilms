import {updateReserve} from "../../models/reserve.js";
import { readReserve } from "../../models/reserve.js";
import { reserveValidator } from "../../models/reserve.js";

export default async function putReserve(req, res, next) {
    try{
        const {id} = req.params;
        const reserve = req.body;

        const userId = req.userLogged.id;
        const cargo = req.userLogged.cargo;
        const oldReserve = await readReserve(+id);
        if( (oldReserve.idUser !== userId) && (cargo === null) ){
            return res.status(403).json({ message: "Você não tem permissão para acessar esta reserva" });
        }

        const {success, error, data} = reserveValidator(reserve, {
            method: true,
            isPCD: true,
            seat: true,
            isHalf: true,
            halfDoc: true,
            idUser: true,
            idSession: true
        });

        if(!success){
            return res.status(400).json({
                message: "Erro ao validar os dados da reserva!",
                errors: error.flatten().fieldErrors
            });
        }

        const result = await updateReserve(+id, data);

        return res.json({
            message: `Reserva ID ${id} atualizada com sucesso`,
            reserve: result
        });
    }catch(error){
        next(error);
    }
}
