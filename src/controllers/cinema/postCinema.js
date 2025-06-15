import {createCinema} from "../../models/cinema.js"
import { cinemaValidator } from "../../models/cinema.js";

export default async function postCinema(req, res, next) {
    try{
        const cinema = req.body
        const { success, error, data } = cinemaValidator(cinema, {id: true})
        
        if(!success){
            return res.status(400).json({
                message: "Erro ao validar os dados do cinema!",
                errors: error.flatten().fieldErrors
            })
        }
        
        const result = await createCinema(data)

        return res.json({
            message: "Cinema cadastrado com sucesso!",
            cinema: result
        })
    }
    catch(error){
        next(error)
    }
    
}