import { listSession } from "../../models/session.js";

export default async function getListSession(req, res, next) {
    try {

        const {id} = req.params;
        const allSessions = await listSession(+id);

        if (!allSessions) {
            return res.status(404).json({
                message: 'Nenhuma sessão encontrada'
            });
        }

        return res.status(200).json({
            message: 'Lista de sessões encontrada com sucesso',
            sessions: allSessions
        });

    } catch (error) {
        next(error);
    }
}