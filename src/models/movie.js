import { PrismaClient } from "@prisma/client"
//import { z } from "zod"

const prisma = new PrismaClient()

// Schema de validação com zod

// Função de validação

export async function listMovie() {
    const result = await prisma.movie.findMany();
    
    return result;
}

export async function readMovie(id) {
    const result = await prisma.movie.findUnique({
        where:{id}
    });

    return result;
}

export async function createMovie(movie) {
    //Banner informado somente como URL
    const result = await prisma.movie.create({
        data: movie
    });

    return result;
}

export async function updateMovie(id, movie) {
    const result = await prisma.movie.update({
        where: {id},
        data: movie
    });

    return result;
}

export async function deleteMovie(id) {
    const result = await prisma.movie.delete({
        where:{id}
    });

    return result;
}