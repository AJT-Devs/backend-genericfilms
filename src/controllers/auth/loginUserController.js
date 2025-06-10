import { userValidator, getEmailUser } from "../../models/user";
import { createToken } from '../../models/token';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function loginUserController(req, res, next) {
    try {

        const { email, password } = req.body;
        const { success, error, data } = userValidator(user, { id: true, name: true, cpf: true, birthdate: true, telNumber: true });

        if (!success) {
            return res.status(400).json({
                message: "erro na validação dos dados",
                error: error.flatten().fieldErrors
            });
        }

        const user = await getEmailUser(email);

        if (!result) {
            return res.status(404).json({
                message: "email de usuário não encontrado",
                error: error
            })
        }

        const validPassword = await bycrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                message: "senha inválida",
                error: error
            });       
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            birthdate: user.birthdate,
            telNumber: user.telNumber
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        await createToken(user.id, token); // cria a sessão do usuário

        



    } catch (error) {
        next(error);
    }
}

/*model user {
    id        Int       @id @default(autoincrement())
    name      String    @db.VarChar(255)
    email     String    @unique(map: "email") @db.VarChar(255)
    password  String    @db.VarChar(999)
    cpf       String    @unique(map: "cpf") @db.Char(11)
    birthdate DateTime  @db.Date
    telNumber String    @db.VarChar(20)
    reserve   reserve[]
}*/