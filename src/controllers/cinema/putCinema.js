import {updateCinema} from "../../models/cinema.js"
import { cinemaValidator } from "../../models/cinema.js";

export default async function putCinema(req, res, next) {
    try{
            const {id} = req.params
            const cinema = req.body
            const {success, error, data} = cinemaValidator(cinema, {name: true, city: true, adress: true, uf: true})

            if(!success){
                return res.status(400).json({
                    message: "Erro ao validar os dados do cinema!",
                    errors: error.flatten().fieldErrors
                })
            }
            const result = await updateCinema(+id, data)
            
            return res.json({
                message: `Cinema atualizado com sucesso`,
                cinema: result
            })
        }
        catch(error){
           next(error)
        }
}