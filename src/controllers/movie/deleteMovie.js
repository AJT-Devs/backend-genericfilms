import {removeMovie} from "../../models/movie.js"

export default async function deleteMovie(req, res, next) {
    try{
        let {id} = req.params

        if(!id){
            return res.status(400).json({ 
                message: 'Filme não deletado, id fo filme não informado.',
                error: 'ID do filme não informado.' 
            });
        }

        if(id){
            id = Number(id);
        }
        
        const result = await removeMovie(id)

        return res.json({
            message: `movie ID ${id} excluido com sucesso`,
            movie: result
        })
    }
    catch(error){
        if(error?.code === "P2025") {
            return res.status(404).json({
                message: 'Filme não encontrado.',
                error: 'Filme não encontrado.'
            });
        }

        console.log(error)
    }
}