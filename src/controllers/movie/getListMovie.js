import {listMovie} from '../../models/movie.js'

export default async function getListMovie(res, next) {
    try {
        const result = await getList()
        return res.json(result)
        
    }catch(error){
        //Mensagem personalizada do erro
        //next(error)
        console.log(error)
    }

}