import express from 'express'
import getCinema from '../controllers/cinema/getCinema.js'
import  getListCinema  from '../controllers/cinema/getListCinema.js'
import postCinema from '../controllers/cinema/postCinema.js'
import putCinema from '../controllers/cinema/putCinema.js'
import patchCinema from '../controllers/cinema/patchCinema.js'
import deleteCinema from '../controllers/cinema/deleteCinema.js'

const cinema = express.Router();


cinema.get('/', getCinema);
cinema.get('/list', getListCinema);
cinema.post('/', postCinema);
cinema.put('/', putCinema);   
cinema.patch('/', patchCinema); 
cinema.delete('/', deleteCinema);

export default cinema