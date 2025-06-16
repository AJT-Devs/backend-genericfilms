import { listByUserReserve } from "../../models/reserve.js";
import configTicket from "./configTicket.js";

export default async function getListByUserTicket(req, res){
    const {id} = req.params;

    const reserves = await listByUserReserve(id);

    let tickets = [];
    for(let i = 0; i < reserves.length; i++){
        const ticket = await configTicket(reserves[i].id);

        tickets.push(ticket);
    }
    
    return res.json(result).status(200);       
}

