import {remove} from "../../models/movie.js"

export default async function deleteMovie(req, res, next) {
    try{
        const {id} = req.params
        
        // const {success, error, data: movieValidated} = movieValidator(+id, {city: true, adress: true, uf: true})
        
        // Aplicar verificação se houver erro
        
        const result = await remove(+id)
        //const result = await remove(movieValidated.id)

        return res.json({
            message: `movie ID ${id} excluido com sucesso`,
            movie: result
        })
    }
    catch(error){
        //Mensagem personalizada de erro
        //next(error)
        console.log(error)
    }
}