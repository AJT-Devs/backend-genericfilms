import {readCinema} from "../../models/cinema.js"

export default async function getCinema(req, res, next) {
    try{
        const {id} = req.params

        const result = await readCinema(+id)

        return res.json({
            cinema: result
        })
    }
    catch(error){
        next(error)
    }
}