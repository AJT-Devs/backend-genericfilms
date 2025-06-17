import { deleteSessionAdmin } from "../../../models/sessionAdmin.js";

export default async function logoutAdmin(req, res, next) {
    
    try{
        // const token = req.body.token;
        const token = req.headers["authorization"].split(" ")[1];

        const sessionAdmin = await deleteSessionAdmin(token);

        if(!sessionAdmin){
            return res.status(400).json({
                message: "Erro ao deslogar administrador!"
            });
        }

        // return res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true }).
        // return res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Lax', secure: false }).
       return res.status(200).json({
            message: "Administrador deslogado com sucesso!"
        });

    } catch(error){
        next(error);
    }

    
        
}