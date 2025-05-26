import { selectReserve } from "../../models/reserve.js"

export async function getReserve(req, res) {
    const {id} = req.params;
    const result = await selectReserve(+id);
    return res.json(result); 
}

export default getReserve