import express from 'express';
import getMovie from '../controllers/movie/getmovie.js';
import getListMovie from '../controllers/movie/getListMovie.js';
import postMovie from '../controllers/movie/postMovie.js';
import putMovie from '../controllers/movie/putMovie.js';
import deleteMovie from '../controllers/movie/deleteMovie.js';

const movie = express.Router();

movie.get('/:id', getMovie);
movie.get('/list', getListMovie);
movie.post('/', postMovie);
movie.put('/:id', putMovie);
movie.delete('/:id', deleteMovie);

export default movie;