import { listReserve } from "../../models/reserve.js";

export default async function getListReserve(req, res) {
    const result = await listReserve();
    return res.json(result);
}