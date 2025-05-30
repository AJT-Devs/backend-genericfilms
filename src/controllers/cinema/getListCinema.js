import {listCinema} from '../../models/cinema.js'

export default async function getListCinema(res, next) {
    try {
        const result = await listCinema()
        return res.json(result)
        
    }catch(error){
        //Mensagem personalizada do erro
        //next(error)
        console.log(error)
    }

}