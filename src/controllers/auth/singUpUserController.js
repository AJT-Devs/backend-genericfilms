import { userValidator, createUser } from '../../models/user.js';
import bcrypt from 'bcrypt';

export default async function signUpUserController(req, res, next) {
    try {
        const user = req.body;
        const { success, error, data } = userValidator(user, { id: true });

        if (!success) {
            return res.status(401).json({
                message: "Erro ao validar os dados do usuário!",
                errors: error.flatten().fieldErrors
            })
        }

        data.password = bcrypt.hashSync(data.password, 10);

        if (data.birthdate) {
            const [day, month, year] = data.birthdate.split('/');
            data.birthdate = new Date(`${year}-${month}-${day}`);
        }

        const newUser = await createUser(data);

        if (!newUser) {
            return res.status(400).json({
                error: 'Erro ao criar usuário',
                message: 'Usuário não pôde ser criado'
            });
        }

        return res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                cpf: newUser.cpf,
                birthdate: newUser.birthdate,
                telNumber: newUser.telNumber
            }
        });
    } catch (error) {
        if (error?.code === "P2002" && error?.meta?.target === "user_email_key") {
            return res.status(400).json({
                message: "Erro ao criar usuário!",
                errors: {
                    email: ["Email já cadastrado!"]
                }
            })
        }

        next(error);
    }
}