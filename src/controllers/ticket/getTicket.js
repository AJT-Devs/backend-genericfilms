import { readReserve } from "../../models/reserve.js";
import { readUser } from "../../models/user.js";
import { readSession } from "../../models/session.js";
import { readMovie } from "../../models/movie.js";
import { readRoom } from "../../models/room.js";
import { readCinema } from "../../models/cinema.js";

export default async function getTicket(req, res){
    const {id} = req.params;

    const reserve = await readReserve(+id);
    
    const user = await readUser(reserve.idUser);
    
    const session = await readSession(reserve.idSession);
    
    const movie = await readMovie(session.idMovie);
    
    const room = await readRoom(session.idRoom);
    
    const cinema = await readCinema(room.idCinema);

    function itsHalf(){
            if(reserve.isHalf){
        return {
            isPCD : reserve.isPCD,
            seat : reserve.seat,
            typeReserve: "Meia",
            halfDoc : reserve.halfDoc,
            startDate : session.startDate,
            endHour : session.endHour,
            format : session.format,
            language : session.language,
            roomName : room.name,
            cinemaName : cinema.name,
            cinemaAddress : cinema.address,
            cinemaCity : cinema.city,
            cinemaUF : cinema.uf,
            movieTitle : movie.title,
            movieClassification : movie.classification
            }
        }

        return {
            isPCD : reserve.isPCD,
            seat : reserve.seat,
            typeReserve: "Inteira",
            startDate : session.startDate,
            endHour : session.endHour,
            format : session.format,
            language : session.language,
            roomName : room.name,
            cinemaName : cinema.name,
            cinemaAddress : cinema.address,
            cinemaCity : cinema.city,
            cinemaUF : cinema.uf,
            movieTitle : movie.title,
            movieClassification : movie.classification
            }
    }

    const result = itsHalf();

    return res.json(result);       
}

