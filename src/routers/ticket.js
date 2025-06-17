import express from 'express';
import getPdfTicket from '../controllers/ticket/getPdfTicket.js';
import getTicket from '../controllers/ticket/getTicket.js';
import getListByUserTicket from '../controllers/ticket/getListByUserTicket.js';
import validTicket from '../controllers/ticket/validTicket.js';
import {authMiddleware} from '../middlewares/verifyUserToken.js'
import verifyAdminToken from '../middlewares/verifyAdminToken.js';

const ticket = express.Router();

// ticket.use(verifyAdminToken);

ticket.get('/list/:id',authMiddleware, getListByUserTicket)
ticket.get('/:id', authMiddleware, getTicket);
ticket.get('/pdf/:id', authMiddleware, getPdfTicket);
ticket.patch('/valid/:id', verifyAdminToken, validTicket);

export default ticket;