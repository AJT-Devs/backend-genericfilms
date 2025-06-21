import { updateMovieModel, movieValidator, readMovie } from "../../models/movie.js"

export default async function putMovie(req, res, next) {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do filme não informado.' });
        }

        if (id) {
            id = Number(id);
        }

        const FilmeAntigo = await readMovie(id);
        if (!FilmeAntigo) {
            return res.status(404).json({
                error: 'Filme não encontrado',
                message: 'O filme com o ID informado não foi encontrado'
            });
        }

        const poster = req.files.poster ? `/uploads/${req.files.poster[0].filename}` : FilmeAntigo.poster;
        const banner = req.files.banner ? `/uploads/${req.files.banner[0].filename}` : FilmeAntigo.banner;

        const updateMovie = req.body;

        if (updateMovie.duration) {
            updateMovie.duration = Number(updateMovie.duration);
        }

        updateMovie.poster = poster;
        updateMovie.banner = banner;
        

        const { success, error, data } = movieValidator(updateMovie);
        if (!success) {
            return res.status(400).json({
                message: "Erro ao validar os dados do atualizado do filme!",
                errors: error.flatten().fieldErrors
            });
        }

        if (data.releaseDate) {
            const [day, month, year] = data.releaseDate.split('/');
            data.releaseDate = new Date(`${year}-${month}-${day}`);
        }

        if (data.releaseDate) {
            data.releaseDate = new Date(data.releaseDate);
        }

        const newUpdateMovie = await updateMovieModel(id, data);

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
        {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    error: 'Filme não encontrado',
                    message: 'O filme com o ID informado não foi encontrado'
                });
            }
            if (error?.code === "P2002" && error?.meta?.target === "title" || error?.meta?.target === "movie_title_key") {
                return res.status(400).json({
                    message: "Erro ao atualizar filme!",
                    errors: {
                        title: "Já existe um filme com esse título."
                    }
                });
            }
            if (error?.code === "P2000") {
                return res.status(400).json({
                    message: "Error ao criar filme!",
                    errors: {
                        field: error?.meta?.column_name || "Campo com valor muito longo",
                        detail: "O valor enviado é maior do que o permitido para esse campo."
                    }
                })
            };
            if (error?.code === "P2025") {
                return res.status(404).json({
                    message: "O valor enviado não corresponde ao valor esperado pelo banco de dados.",
                    error: error.message
                });
            }
        }
        console.log(error)
        next(error);
    }
}