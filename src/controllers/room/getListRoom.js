import {listRoom} from '../../models/room.js'

export default async function getListRoom(req, res, next) {
    try {
        const {idCinema} = req.params;
        const result = await listRoom(+idCinema);
        return res.json(result);
        
    }catch(error){
        next(error);
    }

}