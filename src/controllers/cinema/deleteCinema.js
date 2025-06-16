import {removeCinema} from "../../models/cinema.js"

export default async function deleteCinema(req, res, next) {
    try{
        const {id} = req.params
        
        const result = await removeCinema(+id)

        return res.json({
            message: `Cinema ID ${id} excluido com sucesso`,
            cinema: result
        })
    }
    catch(error){
        next(error)
    }
}