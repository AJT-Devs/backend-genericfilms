import { readReserve } from "../../models/reserve.js"
import configDate from "../../middlewares/dateHour/configDate.js"
import configHour from "../../middlewares/dateHour/configHour.js"

export default async function getReserve(req, res) {
    try{
        const { id } = req.params;

        const reserve = await readReserve(+id);
        reserve.buyDate = configDate(reserve.buyDate) + " " + configHour(reserve.buyDate);

        if(!reserve) {
            return res.status(404).json({ message: "Reserva não encontrada" });
        }

        return res.json(reserve).status(200);

    }catch (error) {
        next(error);
    }
}
