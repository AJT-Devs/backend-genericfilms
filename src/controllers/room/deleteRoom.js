import {removeRoom} from "../../models/room.js"

export default async function deleteRoom(req, res, next) {
    try{
        const {id} = req.params
        
        const result = await removeRoom(+id)

        return res.json({
            message: `room ID ${id} excluido com sucesso`,
            room: result
        })
    }
    catch(error){
        next(error)
    }
}