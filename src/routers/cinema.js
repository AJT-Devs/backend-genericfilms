import express from 'express';
import getCinema from '../controllers/cinema/getCinema.js';
import getListCinema  from '../controllers/cinema/getListCinema.js';
import postCinema from '../controllers/cinema/postCinema.js';
import putCinema from '../controllers/cinema/putCinema.js';
import deleteCinema from '../controllers/cinema/deleteCinema.js';

const cinema = express.Router();


cinema.get('/:id', getCinema);
cinema.get('/list', getListCinema);
cinema.post('/', postCinema);
cinema.put('/:id', putCinema);   
cinema.delete('/:id', deleteCinema);

export default cinema;