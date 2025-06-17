import { readReserve } from "../../models/reserve.js";
import { updateReserve } from "../../models/reserve.js";

export default async function validTicket(req, res, next) {
    try{
        const { id } = req.params;
        
        const reserve = await readReserve(+id);

        if(!reserve){
            return res.status(404).json({ message: "Ticket não encontrado" });
        }

        if(reserve.isUsed){
            return res.status(400).json({ message: "Ticket inválido" });
        }
        reserve.isUsed = true;
        await updateReserve(+id, reserve);
        return res.status(200).json({ message: "Ticket validado com sucesso" });
    }catch(error){
        next(error);
    }
}