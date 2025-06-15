import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createToken = async (userId, token) => {

    const result = await prisma.token.create({
        data: {
            token: token,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })
    return result;
}

export const deleteToken = async (idUser, token) => {
    const result = await prisma.token.deleteMany({
        where: { idUser, token }
    })
    return result;
}