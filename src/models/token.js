import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createToken = async (userId, token) => {

    const result = await prisma.token.create({
        data: {
            userId: userId,
            token: token
        }
    })
    return result;
}