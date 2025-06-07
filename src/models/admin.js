import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const adminSchema = z.object({
    id: z.number({
        required_error: 'ID é necessário',
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
        .includes('@genericfilms', 'O email deve ser do domínio Generic Films')
        .email('Email deve ser um endereço de email válido')
        .toLowerCase()
        .max(255, 'Email deve ter no máximo 255 caracteres'),
    password: z.string({
        required_error: 'Senha é necessária',
        invalid_type_error: 'Senha deve ser uma string'
    })
        .min(8, 'Senha deve ter pelo menos 6 caracteres')
        .max(100, 'Senha deve ter no máximo 100 caracteres'),
    cargo: z.string({
        required_error: 'Cargo é necessário',
        invalid_type_error: 'Cargo deve ser uma string'
    })
        .min(3, 'Cargo deve ter pelo menos 3 caracteres')
        .max(50, 'Cargo deve ter no máximo 50 caracteres'),
})

export const adminValidator = (user, partial = null) =>{
    if(partial){
        return adminSchema.partial().safeParse(user);
    }
    return adminSchema.safeParse(user);
}

//CRUD

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
        data: content,
        select: {
            id: true,
            name: true,
            email: true,
            cargo: true
        }
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