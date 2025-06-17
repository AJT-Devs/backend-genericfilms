import { readSession } from '../../models/session.js';

export async function getSession(req, res, next) {

    try {
        let id = req.params.id;

        if (!id) {
            return res.status(400).json({
                message: 'ID da sessão não fornecido'
            });
        }

        const session = await readSession(+id);

        if (!session) {
            return res.status(404).json({
                message: 'Sessão não encontrada'
            });
        }

        return res.status(200).json({
            message: 'Sessão encontrada com sucesso',
            session: session
        });

    } catch (error) {

        {
            if (error?.code === "P2025") {
                return res.status(404).json({
                    message: "Sessão não encontrada",
                    errors: {
                        id: "Sessão não encontrada por esse ID"
                    }
                });
            }
        }
        next(error);
    }

}

export default getSession;