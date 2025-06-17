import { updateSession, sessionValidator } from '../../models/session.js';

export async function putSession(req, res, next) {
    
    try {
        
        let id = req.params.id;

        if (!id) {
            return res.status(400).json({
                message: 'ID da sessão não fornecido'
            });
        }

        let session = req.body;

        const { success, error, data } = sessionValidator(session, { id: true });

        if (!success) {
            console.error("Erro de validação:", error);
            console.error("Dados recebidos:", session);

            return res.status(400).json({
                message: "Dados inválidos",
                errors: error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }

        const result = await updateSession(+id, data);

        if (!result) {
            return res.status(404).json({
                message: 'Sessão não encontrada'
            });
        }

        res.status(200).json({
            message: "Sessão atualizada com sucesso",
            data: result
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
            } else if (error?.code === "P2003" && error?.meta?.constraint?.includes("idRoom")) {
                return res.status(400).json({
                    message: "Erro ao atualizar sessão!",
                    errors: {
                        idRoom: "Sala não encontrada"
                    }
                });
            } else if (error?.code === "P2003" && error?.meta?.constraint?.includes("idMovie")) {
                return res.status(400).json({
                    message: "Erro ao atualizar sessão!",
                    errors: {
                        idMovie: "Filme não encontrado"
                    }
                });
            }
        }

        next(error);
    }

}

export default putSession;