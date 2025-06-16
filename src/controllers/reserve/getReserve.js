import { readReserve } from "../../models/reserve.js"

export default async function getReserve(req, res) {
    try{
        const { id } = req.params;

        const reserve = await readReserve(+id);

        return res.json(reserve).status(200);

    }catch (error) {
        next(error);
    }
}
