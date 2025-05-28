import express from 'express';
import getPdfTicket from '../controllers/ticket/getPdfTicket.js';
import getTicket from '../controllers/ticket/getticket.js';

const ticket = express.Router();

ticket.get('/:id', getTicket);
ticket.get('/pdf/:id', getPdfTicket);

export default ticket;