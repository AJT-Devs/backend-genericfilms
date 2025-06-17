import express from 'express';
import getCinema from '../controllers/cinema/getCinema.js';
import getListCinema  from '../controllers/cinema/getListCinema.js';
import postCinema from '../controllers/cinema/postCinema.js';
import putCinema from '../controllers/cinema/putCinema.js';
import deleteCinema from '../controllers/cinema/deleteCinema.js';
import verifyAdminToken from '../middlewares/verifyAdminToken.js';

const cinema = express.Router();

cinema.use(express.json());

cinema.get('/list', getListCinema);
cinema.get('/:id', getCinema);
cinema.post('/create', verifyAdminToken, postCinema);
cinema.put('/:id', verifyAdminToken, putCinema);   
cinema.delete('/:id', verifyAdminToken, deleteCinema);

export default cinema;