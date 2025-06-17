import express from 'express';
import getReserve from '../controllers/reserve/getReserve.js';
import getListReserve from '../controllers/reserve/getListReserve.js';
import postReserve from '../controllers/reserve/postReserve.js';
import putReserve from '../controllers/reserve/putReserve.js';
import patchReserve from '../controllers/reserve/patchReserve.js';
import deleteReserve from '../controllers/reserve/deleteReserve.js';
import { authMiddleware } from '../Middlewares/verifyUserToken.js';

const reserves = express.Router();


reserves.use(express.json());
reserves.use(authMiddleware); 

reserves.get('/list/:id', getListReserve);
reserves.get('/:id', getReserve);
reserves.post('/', postReserve);
reserves.put('/:id', putReserve);
reserves.patch('/:id', patchReserve);
reserves.delete('/:id', deleteReserve);

export default reserves;