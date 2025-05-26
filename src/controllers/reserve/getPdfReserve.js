import puppeteer from "puppeteer";
import { selectReserve } from "../../models/reserve.js";
import movieTicket from "../../view/tickets/movieticket.js";

export default async function getPdfReserve(req, res) {
    const {idReserve} = req.params;
    const myReserve = await selectReserve(+idReserve);

    const {idSession} = myReserve.idSession;
    const mySession = await selectReserve()

    const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
      
      
        await page.setContent(movieTicket(result));
        
        const pdfBuffer = await page.pdf({
          format: "a4"
        });
      
        res.setHeader("Content-Disposition", 'attachment; filename="ingresso.pdf"');;
        res.setHeader("Content-Type", "application/pdf");
        await browser.close();
      
        return res.end(pdfBuffer);
}

