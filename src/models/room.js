import { PrismaClient } from "@prisma/client"
//import { z } from "zod"

const prisma = new PrismaClient()

// Schema de validação com zod

// Função de validação

export async function listRoom() {
    const result = await prisma.room.findMany();
    
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

export async function deleteRoom(id) {
    const result = await prisma.room.delete({
        where:{id}
    });

    return result;
}