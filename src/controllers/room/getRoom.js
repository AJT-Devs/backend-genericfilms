import {readRoom} from "../../models/room.js"

export default async function getRoom(req, res, next) {
    try{
        const {id} = req.params
        // const {success, error, data: roomValidated} = roomValidator(+id, {city: true, adress: true, uf: true})
        
        // Aplicar verificação se houver erro
        
        const result = await readRoom(+id)
        //const result = await get(roomValidated.id)

        return res.json({
            room: result
        })
    }
    catch(error){
        //Mensagem personalizada de erro
        //next(error)
        console.log(error)
    }
}