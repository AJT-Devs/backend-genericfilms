import {createMovie } from "../../models/movie.js"

export default async function postMovie(req, res, next) {
    try{
        //Banner informado somente como URL
        const movie = req.body
        // const {success, error, data: movieValidated} = movieValidator(movie, {id: true})
        
        // Aplicar verificação se houver erro
        
        const result = await createMovie(movie)
        //const result = await create(movieValidated)

        return res.json({
            message: "movie cadastrado com sucesso!",
            movie: result
        })
    }
    catch(error){
        //Mensagem de erro personalizada
        //next(error)
        console.log(error)
    }
    
}