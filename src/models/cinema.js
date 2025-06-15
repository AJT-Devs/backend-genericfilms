import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

const cinemaSchema = z.object({
    id: z.number({
        required_error: 'ID é necessário',
        invalid_type_error: 'ID deve ser um número'
    })
        .positive()
        .min(1, 'ID deve ser maior que 0'),
    name: z.string({
        required_error: 'Nome é necessário',
        invalid_type_error: 'Nome deve ser uma string'
    })
        .min(10, 'Nome deve ter pelo menos 10 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    city: z.string({
        required_error: 'Cidade é necessária',
        invalid_type_error: 'Cidade deve ser uma string'
    })
        .min(3, 'Cidade deve ter pelo menos 2 caracteres')
        .max(50, 'Cidade deve ter no máximo 255 caracteres'),
    address: z.string({ 
        required_error: 'Endereço é necessário',
        invalid_type_error: 'Endereço deve ser uma string'
    })
        .min(10, 'Endereço deve ter pelo menos 10 caracteres')
        .max(255, 'Endereço deve ter no máximo 255 caracteres'),
    uf: z.string({
        required_error: 'UF é necessária',
        invalid_type_error: 'UF deve ser uma string'
    })
        .length(2, 'UF deve ter exatamente 2 caracteres')
        .toUpperCase()
})

export const cinemaValidator = (cinema, partial = null) => {
    if (partial) {
        return cinemaSchema.partial().safeParse(cinema);
    }
    return cinemaSchema.safeParse(cinema);
}

export async function listCinema() {
    const result = await prisma.cinema.findMany();
    
    return result;
}

export async function readCinema(id) {
    const result = await prisma.cinema.findUnique({
        where: {id}
    });

    return result;
}

export async function createCinema(cinema) {
    const result = await prisma.cinema.create({
        data: cinema
    });

    return result;
}

export async function updateCinema(id, cinema) {
    const result = await prisma.cinema.update({
        where: {id},
        data: cinema
    });

    return result;
}

export async function removeCinema(id) {
    const result = await prisma.cinema.delete({
        where: {id}
    });

    return result;
}