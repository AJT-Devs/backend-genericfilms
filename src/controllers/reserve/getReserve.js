import { readReserve } from "../../models/reserve.js"

export default async function getReserve(req, res) {
    const {id} = req.params;
    const result = await readReserve(+id);
    return res.json(result); 
}
