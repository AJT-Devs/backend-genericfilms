import {removeRoom} from "../../models/room.js"

export default async function deleteRoom(req, res, next) {
    try{
        const {id} = req.params
        
        // const {success, error, data: roomValidated} = roomValidator(+id, {city: true, adress: true, uf: true})
        
        // Aplicar verificação se houver erro
        
        const result = await removeRoom(+id)
        //const result = await remove(roomValidated.id)

        return res.json({
            message: `room ID ${id} excluido com sucesso`,
            room: result
        })
    }
    catch(error){
        //Mensagem personalizada de erro
        //next(error)
        console.log(error)
    }
}