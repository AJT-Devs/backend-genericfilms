import { readUser } from '../../models/user.js';

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const user = await readUser(+id);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado",
                error: "Id não registrado"
            });
        }

        return res.status(200).json({
            message: "Usuário encontrado",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                birthdate: user.birthdate,
                telNumber: user.telNumber
            }
        });

    } catch (error) {
        next(error);
    }
}

export default getUser;