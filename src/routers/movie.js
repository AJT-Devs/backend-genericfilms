import express from 'express';
import getMovie from '../controllers/movie/getMovie.js';
import getListMovie from '../controllers/movie/getListMovie.js';
import postMovie from '../controllers/movie/postMovie.js';
import putMovie from '../controllers/movie/putMovie.js';
import deleteMovie from '../controllers/movie/deleteMovie.js';
import uploadMiddleware from '../middlewares/uploadImage.js';

const movie = express.Router();

movie.post('/movie',
    uploadMiddleware.fields([
        { name: "poster", maxCount: 1 },
        { name: "banner", maxCount: 1 }
    ]),
    postMovie
);

movie.put('/put/:id',
    uploadMiddleware.fields([
        { name: "poster", maxCount: 1 },
        { name: "banner", maxCount: 1 }
    ]),
    putMovie);


movie.get('/list', express.json(), getListMovie);

movie.get('/:id', getMovie);
movie.delete('/:id', deleteMovie);

export default movie;