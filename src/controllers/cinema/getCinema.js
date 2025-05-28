import {readCinema} from "../../models/cinema.js"

export default async function getCinema(req, res, next) {
    try{
        const {id} = req.params
        // const {success, error, data: cinemaValidated} = cinemaValidator(+id, {city: true, adress: true, uf: true})
        
        // Aplicar verificação se houver erro
        
        const result = await get(+id)
        //const result = await get(cinemaValidated.id)

        return res.json({
            cinema: result
        })
    }
    catch(error){
        //Mensagem personalizada de erro
        //next(error)
        console.log(error)
    }
}