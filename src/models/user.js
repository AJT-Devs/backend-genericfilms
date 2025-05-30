import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const userSchema = z.object({
    id: z.number({
        required_error: 'ID é necessario',
        invalid_type_error: 'ID deve ser um número'
    })
        .positive()
        .min(1, 'ID deve ser maior que 0'),
    name: z.string({
        required_error: 'Nome é necessário',
        invalid_type_error: 'Nome deve ser uma string'
    })
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(70, 'Nome deve ter no máximo 70 caracteres'),
    email: z.string({
        required_error: 'Email é necessário',
        invalid_type_error: 'Email deve ser uma string'
    })
        .email('Email deve ser um endereço de email válido')
        .max(255, 'Email deve ter no máximo 255 caracteres'),
    password: z.string({
        required_error: 'Senha é necessária',
        invalid_type_error: 'Senha deve ser uma string'
    })
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .max(255, 'Senha deve ter no máximo 100 caracteres'),
    cpf: z.string({
        required_error: 'CPF é necessário',
        invalid_type_error: 'CPF deve ser uma string'
    })
        .length(11, 'CPF deve ter exatamente 11 caracteres'),
    birthdate: z.string().date({
        invalid_type_error: 'Data de nascimento deve ser uma string'
    })
        .refine(date => !isNaN(Date.parse(date)), {
            message: 'Data de nascimento deve ser uma data válida'
        })
        .optional()
        .nunnalble(),
    telNumber: z.string({
        invalid_type_error: 'Número de telefone deve ser uma string'
    })
    .optional()
    .nullable()
    .min(11, 'Número de telefone deve ter pelo menos 11 caracteres')
    .max(20, 'Número de telefone deve ter no máximo 20 caracteres')
});

export const userValidator = (user, partial = null) => {
    if (partial) {
        return userSchema.partial().safeParse(user);
    }
    return userSchema.safeParse(user); 
} 

export async function createUser(user) {
    const validation = userValidator(user);
    if (!validation.success) {
        throw new Error(validation.error.errors.map(e => e.message).join(', '));
    }

    const result = await prisma.user.create({
        data: validation.data
    });
    return result;
}

export async function readUser(id) {
    const result = await prisma.user.findUnique({
        where: { id }
    });
    return result;
}