import {readRoom} from "../../models/room.js"

export default async function getRoom(req, res, next) {
    try{
        const {id} = req.params
        
        const result = await readRoom(+id)

        return res.json({
            room: result
        })
    }
    catch(error){
        next(error);
    }
}