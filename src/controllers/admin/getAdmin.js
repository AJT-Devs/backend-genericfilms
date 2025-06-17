import { readAdmin } from "../../models/admin.js"

export default async function getAdmin(req, res, next){
    try{
        const {id} = req.params;
        const result = await readAdmin(+id);

        if(!result){
            return res.status(404).json({ message: "Admin não encontrado" });
        }
        
        res.status(200).json({
            admin: result
        });

    }catch (error) {
        next(error);
    }
    
}
