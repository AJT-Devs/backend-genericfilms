import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function listReserve(){
    const result = await prisma.reserve.findMany();
    return result;
}

export async function selectReserve(id){
    const result = await prisma.reserve.findUnique({
        where: {id}
    });
    return result;
}