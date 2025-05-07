import express from 'express';
import getMovie from '../controllers/movie/getmovie.js';
import getListMovie from '../controllers/movie/getListMovie.js';
import postMovie from '../controllers/movie/postMovie.js';
import putMovie from '../controllers/movie/putMovie.js';
import patchMovie from '../controllers/movie/patchMovie.js';
import deleteMovie from '../controllers/movie/deleteMovie.js';

const movie = express.Router();

movie.get('/', getMovie);
movie.get('/list', getListMovie);
movie.post('/', postMovie);
movie.put('/', putMovie);
movie.patch('/', patchMovie);
movie.delete('/', deleteMovie);

export default movie;