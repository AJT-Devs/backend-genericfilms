import configTicket from "./configTicket.js";

export default async function getTicket(req, res){
    const {id} = req.params;

    const result = await configTicket(+id);

    return res.json(result).status(200);       
}



