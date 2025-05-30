import {removeCinema} from "../../models/cinema.js"

export default async function deleteCinema(req, res, next) {
    try{
        const {id} = req.params
        
        // const {success, error, data: cinemaValidated} = cinemaValidator(+id, {city: true, adress: true, uf: true})
        
        // Aplicar verificação se houver erro
        
        const result = await removeCinema(+id)
        //const result = await remove(cinemaValidated.id)

        return res.json({
            message: `Cinema ID ${id} excluido com sucesso`,
            cinema: result
        })
    }
    catch(error){
        //Mensagem personalizada de erro
        //next(error)
        console.log(error)
    }
}