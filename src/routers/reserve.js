import express from 'express';
import getReserve from '../controllers/reserve/getReserve.js';
import postReserve from '../controllers/reserve/postReserve.js';
import putReserve from '../controllers/reserve/putReserve.js';
import patchReserve from '../controllers/reserve/patchReserve.js';
import deleteReserve from '../controllers/reserve/deleteReserve.js';

const reserves = express.Router();

reserves.get('/', getReserve);
reserves.post('/', postReserve);
reserves.put('/', putReserve);
reserves.patch('/', patchReserve);
reserves.delete('/', deleteReserve);

export default reserves;