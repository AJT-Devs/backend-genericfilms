import {readMovie} from "../../models/movie.js"

export default async function getMovie(req, res, next) {
    try{
        const {id} = req.params
        // const {success, error, data: movieValidated} = movieValidator(+id, {city: true, adress: true, uf: true})
        
        // Aplicar verificação se houver erro
        
        const result = await get(+id)
        //const result = await get(movieValidated.id)

        return res.json({
            movie: result
        })
    }
    catch(error){
        //Mensagem personalizada de erro
        //next(error)
        console.log(error)
    }
}