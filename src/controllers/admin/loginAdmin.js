import { authAdmin } from "../../models/admin.js";

export default async function loginAdmin(req, res) {
    try{
        const {email, password} = req.body;
        const result = await authAdmin(email, password);
        
        if(!result){
            return res.status(400).json({
                message: "Email ou senha inválidos!",
            });
        }

        return res.status(200).json({
            message: "Administrador logado com sucesso!",});
    } catch(error){
        return res.status(400).json({
            message: "Erro ao autenticar administrador!",
        });
    }
}