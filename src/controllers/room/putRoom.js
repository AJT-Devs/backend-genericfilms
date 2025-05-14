import {update} from "../../models/room.js"

export default async function putRoom(req, res, next) {
    try{
            const {id} = req.params
            const room = req.body
            // const {success, error, data: roomValidated} = roomValidator(+id, {city: true, adress: true, uf: true})
            
            // Aplicar verificação se houver erro
            
            const result = await update(+id, room)
            //const result = await update(roomValidated.id)
    
            return res.json({
                message: `room atualizado com sucesso`,
                room: result
            })
        }
        catch(error){
            //Mensagem personalizada de erro
            //next(error)
            console.log(error)
        }
}