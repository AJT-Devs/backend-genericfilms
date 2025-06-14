import { deleteSessionAdmin } from "../../models/admin.js";
import jwt from 'jsonwebtoken';

export default async function logoutAdmin(req, res) {
    
    // try{
    //     const token = req.cookies.token;
    //     // const token = req.headers["authorization"].split(" ")[1];
    //     const SECRET = process.env.SECRET;

    //     const sessionAdmin = await deleteSessionAdmin(token);

    //     if(!sessionAdmin){
    //         return res.status(400).json({
    //             message: "Erro ao deslogar administrador!"
    //         });
    //     }

    //     //res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: false })

    //     return res.status(200).json({
    //         result,
    //         message: "Administrador deslogado com sucesso!"
    //     });

    // } catch(error){
    //     return res.status(400).json({
    //         message: "Erro ao deslogar administrador!",
    //     });
    // }

    const token = req.cookies.token;
        // const token = req.headers["authorization"].split(" ")[1];
        const SECRET = process.env.SECRET;

        const sessionAdmin = await deleteSessionAdmin(token);

        if(!sessionAdmin){
            return res.status(400).json({
                message: "Erro ao deslogar administrador!"
            });
        }

        //res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: false })

        return res.status(200).json({
            message: "Administrador deslogado com sucesso!"
        });
        
}