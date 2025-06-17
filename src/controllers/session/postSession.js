import { createSession, sessionValidator } from '../../models/session.js';

export async function postSession(req, res, next) {
    try {
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
                })
                )
            });
        }

        const result = await createSession(data);

        if (!result) {
            return res.status(500).json({
                message: "Erro ao criar sessão"
            });
        }

        res.status(201).json({
            message: "Sessão criada com sucesso",
            data: result
        });

    } catch (error) {
        {
            if (error?.code === "P2003" && error?.meta?.constraint?.includes("idRoom")) {
                return res.status(400).json({
                    message: "Erro ao criar sessão!",
                    errors: {
                        idRoom: "Sala não encontrada"
                    }
                });
            } else if (error?.code === "P2003" && error?.meta?.constraint?.includes("idMovie")) {
                return res.status(400).json({
                    message: "Erro ao criar sessão!",
                    errors: {
                        idMovie: "Filme não encontrado"
                    }
                });
            }
        }
              next(error);
        }
    }
    
    export default postSession;