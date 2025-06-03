export default function movieTicket(content){
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
<img src="../uploads/user-1748817777115.jpg" alt="se der errado">
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
<img src="http://localhost:3000/uploads/angelo-1748818165294.jpg" width="100px" heigth="100px" alt="se der errado">
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
