import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function listSession(){
    const result = await prisma.session.findMany();
    return result;
}

export async function readSession(id){
    const result = await prisma.session.findUnique({
        where: {id}
    });
    return result;
}