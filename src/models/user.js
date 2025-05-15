import { prismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new prismaClient();

const userSchema = z.object({ 
    id: z.number({
        required_error: 'ID é necessario',
        invalid_type_error: 'ID deve ser um número'
    })
    .positive(),
    name: z.string
});