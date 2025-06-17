import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const movieSchema = z.object({
    title: z.string({
        required_error: 'Título é necessário',
        invalid_type_error: 'Título deve ser uma string'
    })
        .min(5, 'Título deve ter pelo menos 5 caractere')
        .max(255, 'Título deve ter no máximo 255 caracteres'),
    duration: z.number({
        required_error: 'Duração é necessária',
        invalid_type_error: 'Duração deve ser um número'
    })
        .int('Duração deve ser um número inteiro')
        .positive('Duração deve ser um número positivo'),
    trailer: z.string({
        required_error: 'Trailer é necessário',
        invalid_type_error: 'Trailer deve ser uma string'
    })
        .max(255, 'Trailer deve ter no máximo 255 caracteres'),
    synopsis: z.string({
        required_error: 'synopsis é necessária',
        invalid_type_error: 'synopsis deve ser uma string'
    })
        .max(999, 'synopsis deve ter no máximo 999 caracteres'),
    director: z.string({
        required_error: 'Diretor é necessário',
        invalid_type_error: 'Diretor deve ser uma string'
    })
        .max(100, 'Diretor deve ter no máximo 100 caracteres'),
    releaseDate: z.string({
        required_error: 'Data de lançamento é necessária',
        invalid_type_error: 'Data de lançamento deve ser uma string'
    }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'), //nao deu muito certo esse regex, mas funcionouo cadastro do movie
    classification: z.string({
        required_error: 'Classificação é necessária',
        invalid_type_error: 'Classificação deve ser uma string'
    })
        .max(2, 'Classificação deve ter no máximo 2 caracteres'),
    cast: z.string({
        required_error: 'Elenco é necessário',
        invalid_type_error: 'Elenco deve ser uma string'
    })
        .max(999, 'Elenco deve ter no máximo 255 caracteres'),
    gender: z.string({
        required_error: 'Gênero é necessário',
        invalid_type_error: 'Gênero deve ser uma string'
    })
        .max(150, 'Gênero deve ter no máximo 150 caracteres'),
    poster: z.string({
        required_error: 'Poster é necessário',
        invalid_type_error: 'Poster deve ser uma string'
    }),
    banner: z.string({
        required_error: 'Banner é necessário',
        invalid_type_error: 'Banner deve ser uma string'
    }),
});

export const movieValidator = (movie, partialKeys = []) => {
    if (Array.isArray(partialKeys) && partialKeys.length > 0) {
        return movieSchema.partial(partialKeys).safeParse(movie);
    }
    return movieSchema.safeParse(movie);
};

export async function listMovie() {
    const result = await prisma.movie.findMany();

    return result;
}

export async function readMovie(id) {
    const result = await prisma.movie.findUnique({
        where: { id }
    });

    return result;
}

export async function readMovieByTitle(title) {
    const result = await prisma.movie.findUnique({
        where: { title }
    });

    return result;
}

export async function readAllMovies() {
    const result = await prisma.movie.findMany({
        select: {
            id: true,
            title: true,
            duration: true,
            trailer: true,
            synopsis: true,
            director: true,
            releaseDate: true,
            classification: true,
            gender: true,
            cast: true,
            poster: true,
            banner: true
        }
    })
            return result;
};

export async function createMovie(movie) {
    //Banner informado somente como URL
    const result = await prisma.movie.create({
        data: movie,
        select: {
            title: true,
            duration: true,
            trailer: true,
            synopsis: true,
            director: true,
            releaseDate: true,
            classification: true,
            gender: true,
            cast: true,
            poster: true,
            banner: true
        }
    });

    return result;
}

export async function updateMovieModel(id, movie) {
    const result = await prisma.movie.update({
        where: { id  },
        data: movie,
        select: {
            title: true,
            duration: true,
            trailer: true,
            synopsis: true,
            director: true,
            releaseDate: true,
            classification: true,
            gender: true,
            cast: true,
            poster: true,
            banner: true
        }
    });

    return result;
}

export async function removeMovie(id) {
    const result = await prisma.movie.delete({
        where: { id }
    });

    return result;
}