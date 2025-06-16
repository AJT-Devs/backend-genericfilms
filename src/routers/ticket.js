import express from 'express';
import getPdfTicket from '../controllers/ticket/getPdfTicket.js';
import getTicket from '../controllers/ticket/getTicket.js';
import getListByUserTicket from '../controllers/ticket/getListByUserTicket.js';
import verifyAdminToken from '../middlewares/verifyAdminToken.js';

const ticket = express.Router();

// ticket.use(verifyAdminToken);

ticket.get('/list/:id',getListByUserTicket)
ticket.get('/:id', getTicket);
ticket.get('/pdf/:id', getPdfTicket);

export default ticket;