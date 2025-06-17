import { readReserve } from "../../models/reserve.js"
import configDate from "../../middlewares/dateHour/configDate.js"
import configHour from "../../middlewares/dateHour/configHour.js"
import user from "../../routers/user.js";

export default async function getReserve(req, res, next) {
    try{
        const { id } = req.params;

        const userId = req.userLogged.id;
        const cargo = req.userLogged.cargo;


        const reserve = await readReserve(+id);

        if( (reserve.idUser !== userId) && (cargo === null) ){
            return res.status(403).json({ message: "Você não tem permissão para acessar esta reserva" });
        }
        reserve.buyDate = configDate(reserve.buyDate) + " " + configHour(reserve.buyDate);

        if(!reserve) {
            return res.status(404).json({ message: "Reserva não encontrada" });
        }

        return res.json(reserve).status(200);

    }catch (error) {
        next(error);
    }
}
