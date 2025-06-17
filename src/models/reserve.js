import { PrismaClient } from "@prisma/client"
import { z } from "zod";

const prisma = new PrismaClient();

const reserveSchema = z.object({
    id: z.number({
        required_error: 'ID é necessário',
        invalid_type_error: 'ID deve ser um número'
    })
        .positive()
        .min(1, 'ID deve ser maior que 0'),
    buyDate: z.string({
        required_error: 'Data de compra é necessária',
        invalid_type_error: 'Data de compra deve ser uma data válida'
    }),
    method: z.string({
        required_error: 'Método de pagamento é necessário',
        invalid_type_error: 'Método de pagamento deve ser uma string'
    })
        .min(1, 'Método de pagamento deve ter pelo menos 3 caracteres')
        .max(50, 'Método de pagamento deve ter no máximo 50 caracteres'),
    isPCD: z.boolean({
        required_error: 'Campo PCD é necessário',
        invalid_type_error: 'Campo PCD deve ser um booleano'
    }),
    seat: z.string({
        required_error: 'Assento é necessário',
        invalid_type_error: 'Assento deve ser uma string'
    })
        .min(1, 'Assento deve ter pelo menos 1 caractere')
        .max(3, 'Assento deve ter no máximo 3 caracteres'),
    isHalf: z.boolean({
        required_error: 'Campo meia-entrada é necessário',
        invalid_type_error: 'Campo meia-entrada deve ser um booleano'
    }),
    halfDoc: z.string({
        invalid_type_error: 'Documento de meia-entrada deve ser uma string'
    })
        .min(1, 'Documento de meia-entrada deve ter pelo menos 1 caractere')
        .max(50, 'Documento de meia-entrada deve ter no máximo 50 caracteres')
        .optional()
        .nullable(),
    idUser: z.number({
        required_error: 'ID do usuário é necessário',
        invalid_type_error: 'ID do usuário deve ser um número'
    })
        .positive()
        .min(1, 'ID do usuário deve ser maior que 0'),
    idSession: z.number({   
        required_error: 'ID da sessão é necessário',
        invalid_type_error: 'ID da sessão deve ser um número'
    })
        .positive()
        .min(1, 'ID da sessão deve ser maior que 0')
})

export const reserveValidator = (reserve, partial = null) => {
    if (partial) {
        return reserveSchema.partial().safeParse(reserve);
    }
    return reserveSchema.safeParse(reserve);
}

export async function listByUserReserve(idUser){
    const result = await prisma.reserve.findMany({
        where:{idUser}
    });
    return result;
}

export async function readReserve(id){
    const result = await prisma.reserve.findUnique({
        where: {id}
    });
    return result;
}

export async function createReserve(content) {
    const result = await prisma.reserve.create({
        data: content
    });
    return result;
}

export async function updateReserve(id, content) {
    const result = await prisma.reserve.update({
        where: {id},
        data: content
    });
    return result;
}

export async function removeReserve(id){
    const result = await prisma.reserve.delete({
        where:{id}
    });
    return result;
}