import {updateCinema} from "../../models/cinema.js"

export default async function putCinema(req, res, next) {
    try{
            const {id} = req.params
            const cinema = req.body
            // const {success, error, data: cinemaValidated} = cinemaValidator(+id, {city: true, adress: true, uf: true})
            
            // Aplicar verificação se houver erro
            
            const result = await updateCinema(+id, cinema)
            //const result = await update(cinemaValidated.id)
    
            return res.json({
                message: `Cinema atualizado com sucesso`,
                cinema: result
            })
        }
        catch(error){
            //Mensagem personalizada de erro
            //next(error)
            console.log(error)
        }
}