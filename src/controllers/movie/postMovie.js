import { createMovie, movieValidator } from '../../models/movie.js';

const postMovie = async (req, res, next) => {
    try {
        // Verifica se os arquivos foram enviados
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

        const movie = req.body;

        if (movie.duration) {
            movie.duration = Number(movie.duration);
        }

        movie.poster = poster;
        movie.banner = banner;

        const result = movieValidator(movie);
        if (!result.success) {
            return res.status(400).json({
                message: "Erro ao validar os dados do filme!",
                errors: result.error.flatten().fieldErrors
            });
        }

        if (movie.releaseDate) {
            const [day, month, year] = movie.releaseDate.split('/');
            movie.releaseDate = new Date(`${year}-${month}-${day}`);
        }

        if (result.data.releaseDate) {
            result.data.releaseDate = new Date(result.data.releaseDate);
        }

        const newMovie = await createMovie(result.data);

        if (!newMovie) {
            return res.status(400).json({
                error: 'Erro ao criar filme',
                message: 'Filme não pôde ser criado'
            });
        }

        return res.status(201).json({
            message: 'Filme criado com sucesso',
            movie: newMovie
        });
    } catch (error) {
        {
            if (error?.code === "P2002" && error?.meta?.target === "title" || error?.meta?.target === "movie_title_key") {
                return res.status(400).json({
                    message: "Erro ao criar filme!",
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

        next(error);
    }


}

export default postMovie;