import { readReserve } from "../../models/reserve.js";
import { readSession } from "../../models/session.js";
import { readMovie } from "../../models/movie.js";
import { readRoom } from "../../models/room.js";
import { readCinema } from "../../models/cinema.js";
import configDate from "../../middlewares/dateHour/configDate.js";
import configHour from "../../middlewares/dateHour/configHour.js";

export default async function getTicket(req, res){
    const {id} = req.params;

    const result = await configTicket(+id);

    return res.json(result).status(200);       
}

async function configTicket(id){
    const reserve = await readReserve(id);
    
    const session = await readSession(reserve.idSession);
    
    const movie = await readMovie(session.idMovie);
    
    const room = await readRoom(session.idRoom);
    
    const cinema = await readCinema(room.idCinema);
    const startDate = configDate(session.startDate);
    const startHour = configHour(session.startDate);
    const endHour = configHour(session.endHour);
    const typeReserve = configTypeReserve();
    let ticket = {
            isPCD : reserve.isPCD,
            seat : reserve.seat,
            typeReserve: typeReserve,
            startDate : startDate,
            startHour : startHour,
            endHour : endHour,
            format : session.format,
            language : session.language,
            roomName : room.name,
            cinemaName : cinema.name,
            cinemaAddress : cinema.address,
            cinemaCity : cinema.city,
            cinemaUF : cinema.uf,
            movieTitle : movie.title,
            movieBanner : movie.banner,
    }

    function configTypeReserve(){
        if(reserve.isHalf){
            return "Meia"
        }
        return "Inteira"
    }
    
    
return ticket;
}

