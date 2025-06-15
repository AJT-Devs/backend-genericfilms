import { deleteUser } from "../../models/user.js";

const deleteUserController = async (req, res, next) => {
    try {
        const userId = req.body.id;

        if (!userId) {
            return res.status(400).json({ message: 'ID do usuário é necessário para exclusão.' });
        }

        const deletedUser = await deleteUser(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json({
            message: 'Usuário excluído com sucesso.',
            user: deletedUser
        });

    } catch (error) {
        next(error);
    }
}

export default deleteUser;