import {updateRoom} from "../../models/room.js"
import {roomValidator} from "../../models/room.js"

export default async function putRoom(req, res, next) {
    try{
            const {id} = req.params
            const room = req.body
            
            const { success, error, data } = roomValidator(room, {
                 id: true,
                 name: true,
                 numSeats: true,
                 numPCD: true,
                 idCinema: true
            });

            if(!success){
                return res.status(400).json({
                    message: "Erro ao validar os dados da sala!",
                    errors: error.flatten().fieldErrors
                });
            }
            
            const result = await updateRoom(+id, data)
    
            return res.json({
                message: `sala atualizado com sucesso`,
                room: result
            })
        }
        catch(error){
            next(error);
        }
}