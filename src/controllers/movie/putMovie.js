import {updateMovie} from "../../models/movie.js"

export default async function putMovie(req, res, next) {
    try{
            const {id} = req.params
            const movie = req.body
            // const {success, error, data: movieValidated} = movieValidator(+id, {city: true, adress: true, uf: true})
            
            // Aplicar verificação se houver erro
            
            const result = await updateMovie(+id, movie)
            //const result = await update(movieValidated.id)
    
            return res.json({
                message: `movie atualizado com sucesso`,
                movie: result
            })
        }
        catch(error){
            //Mensagem personalizada de erro
            //next(error)
            console.log(error)
        }
}