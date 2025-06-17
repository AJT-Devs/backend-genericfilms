import { removeSession } from '../../models/session.js';

export async function deleteSession(req, res, next) {
    
    try {
        let id = req.params.id;

        if (!id) {
            return res.status(400).json({
                message: 'ID da sessão não fornecido'
            });
        }

        const result = await removeSession(+id);

        if (!result) {
            return res.status(404).json({
                message: 'Sessão nao encontrada'
            });
        }

        return res.status(200).json({
            message: 'Sessão removida com sucesso',
            result: result
        });

    } catch (error) {
        {
            if (error?.code === "P2025") {
                return res.status(404).json({
                    message: "Sessão não encontrada",
                    errors: {
                        id: "sessão não encontrada por esse ID"
                    }
                });
            }
        }

        next(error);
    }

}

export default deleteSession;