import puppeteer from "puppeteer";
import configTicket from "./configTicket.js";
import movieTicket from "../../view/tickets/movieticket.js";

export default async function getPdfTicket(req, res, next) {
    try{
        const {id} = req.params;

    const ticket = await configTicket(+id);
    if (!ticket) {
        return res.status(404).json({
            message: "Ticket não encontrado!"
        });
    }

    const browser = await puppeteer.launch({headless: true});

    const page = await browser.newPage();
      
      
    await page.setContent(movieTicket(ticket));
        
    const result = await page.pdf({
        printBackground: true,
        format: "a4"
    });
      
    res.setHeader("Content-Disposition", 'attachment; filename="ingresso.pdf"');;
    res.setHeader("Content-Type", "application/pdf");
    await browser.close();
      
    return res.end(result).status(200);
    }catch(error){
        next(error);
    }
}

