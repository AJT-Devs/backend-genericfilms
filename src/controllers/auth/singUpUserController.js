import { userValidator, createUser } from '../../models/user.js';
import bcrypt from 'bcrypt';

export default async function signUpUserController(req, res, next) {
    try {
        const user = req.body;
        const { success, error, data } = userValidator(user, { partial: true });

        if (!validation.success) {
            return res.status(401).json({
                error: 'Validação de usuário falhou',
                message: 'Dados do usuário inválidos',
                details: validation.error.errors
            });
        }

        validation.data.password = bcrypt.hashSync(validation.data.password, 10);
        const newUser = await createUser(validation.data);

        if (!newUser) {
            return res.status(401).json({
                error: 'Erro ao criar usuário',
                message: 'Usuário não pôde ser criado'
            });
        }

        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error in signUpController:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}