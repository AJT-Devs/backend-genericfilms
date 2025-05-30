import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function listReserve(){
    const result = await prisma.reserve.findMany();
    return result;
}

export async function readReserve(id){
    const result = await prisma.reserve.findUnique({
        where: {id}
    });
    return result;
}

export async function createReserve(content) {
    const result = await prisma.reserve.create({
        data: content
    });
    return result;
}

export async function updateReserve(id, content) {
    const result = await prisma.reserve.update({
        where: {id},
        data: content
    });
    return result;
}

export async function removeReserve(id){
    const result = await prisma.reserve.delete({
        where:{id}
    });
    return result;
}