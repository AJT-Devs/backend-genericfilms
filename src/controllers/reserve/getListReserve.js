import { listByUserReserve } from "../../models/reserve.js";
import configDate from "../../middlewares/dateHour/configDate.js";
import configHour from "../../middlewares/dateHour/configHour.js";

export default async function getListReserve(req, res, next) {
    try{
        const {id} = req.params;
        const result = await listByUserReserve(+id);

        for(let i = 0; i< result.length; i++){
             result[i].buyDate = configDate(result[i].buyDate) + " " + configHour(result[i].buyDate);
        }

        if(!result.length){
            return res.status(404).json({ message: "Nenhuma reserva encontrada para este usuário" });
        }

        return res.json({
            message: `Lista de reservas do usuário ID ${id}`,
            result
        });
    }catch (error) {
        next(error);
    }
}