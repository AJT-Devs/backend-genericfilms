import {updateReserve} from "../../models/reserve.js";
import { reserveValidator } from "../../models/reserve.js";

export default async function patchReserve(req, res, next) {
    try{
        const {id} = req.params;
        const reserve = req.body;

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