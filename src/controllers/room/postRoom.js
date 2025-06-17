import {createRoom} from "../../models/room.js"
import {roomValidator} from "../../models/room.js"

export default async function postRoom(req, res, next) {
    try{
        const room = req.body;

        const { success, error, data } = roomValidator(room, { id: true });
        
        if(!success){
            return res.status(400).json({
                message: "Erro ao validar os dados da sala!",
                errors: error.flatten().fieldErrors
            });
        }
        
        const result = await createRoom(data);

        return res.json({
            message: "sala cadastrado com sucesso!",
            room: data
        })
    }
    catch(error){
        {
            if (error?.code === "P2003" && error?.meta?.constraint?.includes("idCinema")) {
                return res.status(400).json({
                    message: "Erro ao criar sala!",
                    errors: {
                        idCinema: "Cinema não encontrado"
                    }
                });
            }
        }

        next(error);
    }
    
}