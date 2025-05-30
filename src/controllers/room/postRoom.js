import {createRoom} from "../../models/room.js"

export default async function postRoom(req, res, next) {
    try{
        const room = req.body
        // const {success, error, data: roomValidated} = roomValidator(room, {id: true})
        
        // Aplicar verificação se houver erro
        
        const result = await createRoom(room)
        //const result = await create(roomValidated)

        return res.json({
            message: "room cadastrado com sucesso!",
            room: result
        })
    }
    catch(error){
        //Mensagem de erro personalizada
        //next(error)
        console.log(error)
    }
    
}