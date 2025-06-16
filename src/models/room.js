import { PrismaClient } from "@prisma/client"
import { z } from "zod";

const prisma = new PrismaClient()

const roomSchema = z.object({
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
        .min(1, 'Nome deve ter pelo menos 1 caractere')
        .max(50, 'Nome deve ter no máximo 50 caracteres'),
    numSeats: z.number({
        required_error: 'Número de assentos é necessário',
        invalid_type_error: 'Número de assentos deve ser um número'
    })
        .positive()
        .min(1, 'Número de assentos deve ser maior que 0'),
    numPCD: z.number({
        required_error: 'Número de assentos PCD é necessário',
        invalid_type_error: 'Número de assentos PCD deve ser um número'
    })
        .positive()
        .min(1, 'Número de assentos PCD deve ser maior que 0'),
    idCinema: z.number({
        required_error: 'ID do cinema é necessário',
        invalid_type_error: 'ID do cinema deve ser um número'
    })
        .positive()
        .min(1, 'ID do cinema deve ser maior que 0')
})

export const roomValidator = (room, partial = null) => {
    if (partial) {
        return roomSchema.partial().safeParse(room);
    } else {
        return roomSchema.safeParse(room);
    }
}

export async function listRoom(idCinema) {
    const result = await prisma.room.findMany({
        where: {idCinema}
    });
    
    return result;
}

export async function readRoom(id) {
    const result = await prisma.room.findUnique({
        where:{id}
    });

    return result;
}

export async function createRoom(room) {
    const result = await prisma.room.create({
        data: room
    });

    return result;
}

export async function updateRoom(id, room) {
    const result = await prisma.room.update({
        where:{id},
        data: room
    });

    return result;
}

export async function removeRoom(id) {
    const result = await prisma.room.delete({
        where:{id}
    });

    return result;
}