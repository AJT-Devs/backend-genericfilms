import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const userSchema = z.object({ 
    id: z.number({
        required_error: 'ID é necessario',
        invalid_type_error: 'ID deve ser um número'
    })
    .positive(),
    name: z.string
});

export async function readUser(id){
    const result = await prisma.user.findUnique({
        where: {id}
    });
    return result;
}