export default function movieTicket(content){
    return`<!DOCTYPE html>
<html lang="pt_BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket</title>
</head>
<body>
    ${content.id}
    ${content.buyDate}
    ${content.method}
    ${content.isPCD}
    ${content.seat}
    ${content.idUser}
    ${content.idSession}
</body>
</html>`
}