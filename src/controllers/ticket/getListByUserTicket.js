import { readReserve } from "../../models/reserve.js";
import { listByUserReserve } from "../../models/reserve.js";
import { readSession } from "../../models/session.js";
import { readMovie } from "../../models/movie.js";
import { readRoom } from "../../models/room.js";
import { readCinema } from "../../models/cinema.js";
import configDate from "../../middlewares/dateHour/configDate.js";
import configHour from "../../middlewares/dateHour/configHour.js";

export default async function getListByUserTicket(req, res){
    const {id} = req.params;

    const result = await configListTicket(+id);

    return res.json(result).status(200);       
}

async function configListTicket(id){
    const reserves = await listByUserReserve(id);

    let tickets = [];
    for(let i = 0; i < reserves.length; i++){
        const reserve = await readReserve(reserves[i].id);

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
                moviePoster : movie.poster,
                //QRCODE: reserve.qrcode,
                price : session.price
        }

        tickets.push(ticket);

        function configTypeReserve(){
            if(reserve.isHalf){
                return "Meia"
            }
            return "Inteira"
        }

    }
    
   
return tickets;
}