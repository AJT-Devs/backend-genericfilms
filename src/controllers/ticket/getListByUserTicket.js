import { listByUserReserve } from "../../models/reserve.js";
import configTicket from "./configTicket.js";

export default async function getListByUserTicket(req, res, next){
   try{
     const {id} = req.params;

    const reserves = await listByUserReserve(+id);

    if(!reserves || reserves.length === 0){
        return res.status(404).json({message: "Nenhum ingresso encontrado para este usuário!"});
    }
    
    let tickets = [];
    for(let i = 0; i < reserves.length; i++){
        const ticket = await configTicket(reserves[i].id);

        tickets.push(ticket);
    }
    
    return res.json(tickets).status(200);  
   }catch(error){
        next(error);
    }     
}

