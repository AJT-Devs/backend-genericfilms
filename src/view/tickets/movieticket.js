export default function movieTicket(content){
    return`<!DOCTYPE html>
<html lang="pt_BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket</title>
</head>
<body>
<ul>
<li>${content.isPCD}</li>
<li>${content.seat}</li>
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
