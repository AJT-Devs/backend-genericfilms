import express from 'express';
import { readAllMovies } from '../../models/movie.js'

const app = express();
app.use(express.json());

// não tira o req, nao sei se ele ajudo ou não mais nao da problema, entao nao procure por ele
export default async function getListMovie(req, res, next) {
    try {
        const result = await readAllMovies();

        if (!result) {
            return res.status(404).json({
                message: 'Nenhum filme encontrado'
            });
        }

        return res.status(200).json({
            message: 'Lista de filmes encontrada com sucesso',
            movies: result
        });

    } catch (error) {
        console.log(error)
        next(error);
    }

}