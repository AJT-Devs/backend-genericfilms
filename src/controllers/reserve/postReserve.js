import { createReserve } from "../../models/reserve.js";
import { reserveValidator } from "../../models/reserve.js";

export default async function postReserve(req, res, next) {
    try{
        const reserve = req.body;
        
        const { success, error, data } = reserveValidator(reserve, { id: true });

        if(!success){
            return res.status(400).json({
                message: "Erro ao validar os dados da reserva!",
                errors: error.flatten().fieldErrors
            });
        }
        data.buyDate = new Date();

        const result = await createReserve(data);

        return res.json({
            message: "Reserva criada com sucesso!",
            reserve: result
        });

    }catch(error){
        next(error);
    }
}

