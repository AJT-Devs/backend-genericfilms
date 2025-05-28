import {listRoom} from '../../models/room.js'

export default async function getListRoom(res, next) {
    try {
        const result = await getList()
        return res.json(result)
        
    }catch(error){
        //Mensagem personalizada do erro
        //next(error)
        console.log(error)
    }

}