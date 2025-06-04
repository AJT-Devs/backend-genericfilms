export default function movieTicket(content){
let startDate = content.startDate;
startDate = startDate


let endHour = realHour(content.endHour);


    if(content.typeReserve === "Meia" ){
        return `<!DOCTYPE html>
<html lang="pt_BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket</title>
</head>
<body>
<ul>
<img src="${content.movieBanner}" width="500px" height="500px" alt="se der errado">
<li>${content.isPCD}</li>
<li>${content.seat}</li>
<li>${content.typeReserve}</li>
<li>${content.halfDoc}</li>
<li>${content.startDate}</li>
<li>${content.endHour}</li>
<li>${content.format}</li>
<li>${content.language}</li>
<li>${content.roomName}</li>
<li>${content.cinemaName}</li>
<li>${content.cinemaAddress}</li>
<li>${content.cinemaCity}</li>
<li>${content.cinemaUF}</li>
<li>${content.movieTitle}</li>
<li>${content.movieClassification}</li>
</ul>
</body>
</html>`
    }

    return `<!DOCTYPE html>
<html lang="pt_BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket</title>
</head>
<body>
<img src="${content.movieBanner}" width="100px" heigth="100px" alt="se der errado">
<ul>
<li>${content.isPCD}</li>
<li>${content.seat}</li>
<li>${content.typeReserve}</li>
<li>${content.startDate}</li>
<li>${content.endHour}</li>
<li>${content.format}</li>
<li>${content.language}</li>
<li>${content.roomName}</li>
<li>${content.cinemaName}</li>
<li>${content.cinemaAddress}</li>
<li>${content.cinemaCity}</li>
<li>${content.cinemaUF}</li>
<li>${content.movieTitle}</li>
<li>${content.movieClassification}</li>
</ul>
</body>
</html>`
}

function realHour(myHour){
// let endHour = myHour;
// endHour = endHour.split(" ");
// endHour = endHour[4];
// let endMinute = endHour;
// endHour = parseInt(endHour.charAt(0)*10) + parseInt(endHour.charAt(1)+3);
// endHour = endHour.toString();
// endMinute = endMinute.split(":");
// endMinute =endMinute[1];
// let endReal = endHour + ":" + endMinute;
return myHour; 
}