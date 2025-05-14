import {create} from "../../models/cinema.js"

export default async function postCinema(req, res, next) {
    try{
        const cinema = req.body
        // const {success, error, data: cinemaValidated} = cinemaValidator(cinema, {id: true})
        
        // Aplicar verificação se houver erro
        
        const result = await create(cinema)
        //const result = await create(cinemaValidated)

        return res.json({
            message: "Cinema cadastrado com sucesso!",
            cinema: result
        })
    }
    catch(error){
        //Mensagem de erro personalizada
        //next(error)
        return error
    }
    
}