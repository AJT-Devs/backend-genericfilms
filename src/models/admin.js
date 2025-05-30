import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function listAdmin(){
    const result = await prisma.admin.findMany();
    return result;
}

export async function readAdmin(id){
    const result = await prisma.admin.findUnique({
        where: {id}
    });
    return result;
}

export async function createAdmin(content){
    const result = await prisma.admin.create({
        data: content
    });
    return result;
}

export async function updateAdmin(id, content){
    const result = await prisma.admin.update({
        where: {id},
        data: content
    });
    return result;
}

export async function removeAdmin(id){
    const result = await prisma.admin.delete({
        where: {id}
    });
    return result;
}