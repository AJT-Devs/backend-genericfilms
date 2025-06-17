import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function readByTokenSessionAdmin(token){
    const result = await prisma.sessionAdmin.findUnique({
        where: {token}
    });
    return result;
}

export async function createSessionAdmin(content){
    const result = await prisma.sessionAdmin.create({
        data: {
            startDate: new Date(),
            token: content.token,
            userAgent: content.userAgent,
            idAdmin: content.idAdmin
        },
    });
    return result;
}

export async function updateSessionAdmin(token, refreshToken){
    const result = await prisma.sessionAdmin.update({
        where: {token},
        data: {
            token: refreshToken,
            updateDate: new Date(),
        }
    });
    return result;
}

export async function deleteSessionAdmin(token){
    const result = await prisma.sessionAdmin.delete({
        where: {token}
    });
    return result;
}