import { PrismaClient } from "@prisma/client"
//import { z } from "zod"

const prisma = new PrismaClient()

// Schema de validação com zod

// Função de validação

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

export async function deleteCinema(id) {
    const result = await prisma.cinema.delete({
        where: {id}
    });

    return result;
}