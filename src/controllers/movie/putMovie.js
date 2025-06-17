import { updateMovieModel, movieValidator } from "../../models/movie.js"

export default async function putMovie(req, res, next) {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do filme não informado.' });
        }

        if (!req.files || (!req.files.poster && !req.files.banner)) {
            return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
        }

        // Caminhos dos arquivos salvos
        const poster = req.files.poster ? `/uploads/${req.files.poster[0].filename}` : null;
        const banner = req.files.banner ? `/uploads/${req.files.banner[0].filename}` : null;

        if (!poster || !banner) {
            return res.status(400).json({
                message: "É obrigatório enviar as duas imagens: poster e banner."
            });
        }

        const updateMovie = req.body;

        if (updateMovie.duration) {
            updateMovie.duration = Number(updateMovie.duration);
        }

        updateMovie.poster = poster;
        updateMovie.banner = banner;

        const result = movieValidator(updateMovie);
        if (!result.success) {
            return res.status(400).json({
                message: "Erro ao validar os dados do atualizado do filme!",
                errors: result.error.flatten().fieldErrors
            });
        }

        if (updateMovie.releaseDate) {
            const [day, month, year] = updateMovie.releaseDate.split('/');
            updateMovie.releaseDate = new Date(`${year}-${month}-${day}`);
        }

        if (result.data.releaseDate) {
            result.data.releaseDate = new Date(result.data.releaseDate);
        }

        if(id) {
            id = Number(id);
        }        

        const newUpdateMovie = await updateMovieModel(id, result.data);

        if (!newUpdateMovie) {
            return res.status(400).json({
                error: 'Erro ao atualizar filme',
                message: 'Filme não pôde ser atualizado'
            });
        }

        return res.status(200).json({
            message: 'Filme atualizado com sucesso',
            movie: newUpdateMovie
        });

    }
    catch (error) {
        console.log(error)
    }
}