import { updateUser } from "../../models/user.js";

const putUser = async (req, res, next) => {
    try {
        const userData = req.body;

        const updatedUser = await updateUser(userData);

        if (!updatedUser) {
            return res.status(400).json({ message: 'falha ao indentificar dados de atualização' });
        }

        return res.status(200).json({
            message: 'atalização realizada com sucesso',
            user: updatedUser
        });

    } catch (error) {
        next(error);
    }
};

export default putUser;