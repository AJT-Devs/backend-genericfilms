import {listCinema} from '../../models/cinema.js'

export default async function getListCinema(req, res, next) {
    try {
        const result = await listCinema()
        return res.json(result)
        
    }catch(error){
        next(error)
    }

}