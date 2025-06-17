import { readMovie } from "../../models/movie.js"

export default async function getMovie(req, res, next) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Título do filme não informado.' });
        }

        const movie = await readMovie(+id);

        if (!movie) {
            return res.status(404).json({ error: 'Filme não encontrado.' });
        }

        return res.status(200).json({
            message: 'Filme encontrado com sucesso',
            movie
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}