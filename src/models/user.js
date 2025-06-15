import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const userSchema = z.object({
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
    birthdate: z.string({
        invalid_type_error: 'Data de nascimento deve ser uma string'
    })
        .refine(date => !isNaN(Date.parse(date)), {
            message: 'Data de nascimento deve ser uma data válida'
        }),
    telNumber: z.string({
        invalid_type_error: 'Número de telefone deve ser uma string'
    })
});

const loginSchema = z.object({
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
})

export const loginValidator = (user) => {
    return loginSchema.safeParse(user);
}

export const userValidator = (user, partialKeys) => {
    if (Array.isArray(partialKeys) && partialKeys.length > 0) {
        return userSchema.partial(partialKeys).safeParse(user);
    }
    return userSchema.safeParse(user);
}

export async function createUser(user) {
    const result = await prisma.user.create({
        data: user,
        select: {
            name: true,
            email: true,
            cpf: true,
            birthdate: true,
            telNumber: true
        }
    });
    return result;
}

export async function getEmailUser(email) {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            name: true,
            password: true,
            email: true,
            cpf: true,
            birthdate: true,
            telNumber: true
        }
    });
    return user;
}

export async function readByNameUser(name) {
    const result = await prisma.user.findUnique({
        where: {
            name
        }
    })
    return result;
}

export async function readUser(id) {
    const result = await prisma.user.findUnique({
        where: { 
            id 
        }
    });
    return result;
}

export async function ReadAllUsers() {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            birthdate: true,
            telNumber: true
        }
    });
    return result;
}

export async function updateUser(user, isoBirthdate) {
    const result = await prisma.user.update({
        where: {
            id:  user.id
        },
        data: user,
        select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            telNumber: true
        }
    });
    return result;
}

export async function deleteUser(id) {
    const result = await prisma.user.delete({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            birthdate: true,
            telNumber: true
        }
    });
    return result;
}