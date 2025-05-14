import express from 'express';
import getCinema from '../controllers/cinema/getCinema.js';
import getListCinema  from '../controllers/cinema/getListCinema.js';
import postCinema from '../controllers/cinema/postCinema.js';
import putCinema from '../controllers/cinema/putCinema.js';
import deleteCinema from '../controllers/cinema/deleteCinema.js';

const cinema = express.Router();


cinema.get('/', getCinema);
cinema.get('/list', getListCinema);
cinema.post('/', postCinema);
<<<<<<< HEAD
cinema.put('/:id', putCinema);   
cinema.delete('/:id', deleteCinema);
=======
cinema.put('/', putCinema);   
cinema.patch('/', patchCinema); 
cinema.delete('/', deleteCinema);
>>>>>>> 84b5e48273429bfce194603cc69f931f88c02a7c

export default cinema;