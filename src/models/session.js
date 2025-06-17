import { PrismaClient } from "@prisma/client"
import { z } from "zod";

const prisma = new PrismaClient();

const sessionSchema = z.object({
    startDate: z.string({
        required_error: 'Data de início é necessária',
        invalid_type_error: 'Data de início deve ser uma string'
    })
        .refine(val => !isNaN(Date.parse(val)), {
            message: 'Data de início deve ser uma data válida (YYYY-MM-DD ou ISO).'
        }),
    endHour: z.string({
        required_error: 'Hora de término é necessária',
        invalid_type_error: 'Hora de término deve ser uma string'
    })
        .refine(val => !isNaN(Date.parse(val)), {
            message: 'Data de início deve ser uma data válida (YYYY-MM-DD ou ISO).'
        }),
    price: z.number({
        required_error: 'Preço é necessário',
        invalid_type_error: 'Preço deve ser um número'
    })
        .positive(),
    format: z.string({
        required_error: 'Formato é necessário',
        invalid_type_error: 'Formato deve ser uma string'
    }),
    language: z.string({
        required_error: 'Idioma é necessário',
        invalid_type_error: 'Idioma deve ser uma string'
    }),
    idRoom: z.number({
        required_error: 'ID da sala é necessário',
        invalid_type_error: 'ID da sala deve ser um número'
    })
        .positive(),
    idMovie: z.number({
        required_error: 'ID do filme é necessário',
        invalid_type_error: 'ID do filme deve ser um número'
    })
        .positive()
});

export const sessionValidator = (data, partialKeys) => {
    if (Array.isArray(partialKeys) && partialKeys.length > 0) {
        return sessionSchema.partial(partialKeys).safeParse(data);
    }
    return sessionSchema.safeParse(data);
}


export async function listSession() {
    const result = await prisma.session.findMany();
    return result;
}

export async function readSession(id) {
    const result = await prisma.session.findUnique({
        where: { id }
    });
    return result;
}

export async function createSession(content) {
    const result = await prisma.session.create({
        data: content,
        select: {
            startDate: true,
            endHour: true,
            price: true,
            format: true,
            language: true,
            idRoom: true,
            idMovie: true
        }
    });
    return result;
}

export async function updateSession(id, content) {
    const result = await prisma.session.update({
        where: { id },
        data: content,
        select: {
            startDate: true,
            endHour: true,
            price: true,
            format: true,
            language: true,
            idRoom: true,
            idMovie: true
        }

    });
    return result;
}

export async function removeSession(id) {
    const result = await prisma.session.delete({
        where: { id }
    });
    return result;
}