import configTicket from "./configTicket.js";

export default async function getTicket(req, res, next){
    try{
        const {id} = req.params;

    const result = await configTicket(+id);
    if(!result){
        return res.status(404).json({
            message: "Ticket não encontrado!"
        });
    }

    return res.json(result).status(200);
    }catch(error){
       next(error);
    } 
}



