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

export async function createSession(content){
    const result = await prisma.session.create({
        data: content
    });
    return result;
}

export async function updateSession(id, content){
    const result = await prisma.session.update({
        where: {id},
        data: content
    });
    return result;
}

export async function removeSession(id){
    const result = await prisma.session.delete({
        where: {id}
    });
    return result;
}