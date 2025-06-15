import express from 'express';
import getCinema from '../controllers/cinema/getCinema.js';
import getListCinema  from '../controllers/cinema/getListCinema.js';
import postCinema from '../controllers/cinema/postCinema.js';
import putCinema from '../controllers/cinema/putCinema.js';
import deleteCinema from '../controllers/cinema/deleteCinema.js';

const cinema = express.Router();

cinema.use(express.json());

cinema.get('/list', getListCinema);
cinema.get('/:id', getCinema);
cinema.post('/create', postCinema);
cinema.put('/:id', putCinema);   
cinema.delete('/:id', deleteCinema);

export default cinema;