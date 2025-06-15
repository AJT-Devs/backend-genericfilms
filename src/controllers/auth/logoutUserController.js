import { deleteToken } from "../../models/token.js";

const logoutUserController = async (req, res, next) => {
    try {
        let accessToken = req.body.accessToken;
        if (!req.userLogged || !req.userLogged.id) {
            if (!accessToken) {
                return res.status(401).json({
                    error: "Erro no logout, accessToken não informado!"
                });
            }
        }

        await deleteToken(req.userLogged.id, accessToken);

        return res.json({
            success: "Logout efetuado com sucesso!"
        });
    } catch (error) {
        // 'P2025' error: token não encontrado no banco (já foi deletado ou nunca existiu)
        if (error?.code === 'P2025') {
            return res.json({
                success: "Logout efetuado com sucesso!"
            });
        }
        next(error);
    }
};

export default logoutUserController;