import { readReserve } from "../../models/reserve.js";
import { readSession } from "../../models/session.js";
import { readMovie } from "../../models/movie.js";
import { readRoom } from "../../models/room.js";
import { readCinema } from "../../models/cinema.js";
import configDate from "../../middlewares/dateHour/configDate.js";
import configHour from "../../middlewares/dateHour/configHour.js";
import QRCode from "qrcode";

export default async function configTicket(id){
    const reserve = await readReserve(id);
    
    const session = await readSession(reserve.idSession);
            
    const movie = await readMovie(session.idMovie);
        
    const room = await readRoom(session.idRoom);
        
    const cinema = await readCinema(room.idCinema);
    
    const startDate = configDate(session.startDate);
    const startHour = configHour(session.startDate);
    const endHour = configHour(session.endHour);
    const typeReserve = configTypeReserve(reserve.isHalf);

    const qrcodeOptions = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 0,
        color: {
        dark:"#0F0F0F",
        light:"#FAFAFA"
    }
}
    
    const qrcode = await QRCode.toDataURL(`http://localhost:3000/ticket/valid/${reserve.id}`, qrcodeOptions);

    return {        
                    id : reserve.id,
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
                    qrcode : qrcode,
                    price : session.price
    }
}

function configTypeReserve(isHalf){
    if(isHalf){
        return "Meia"
    }
    
    return "Inteira"
}