import { loginValidator, getEmailUser } from "../../models/user.js";
import {createToken}  from '../../models/token.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function loginUserController(req, res, next) {
    try {

        const { email, password } = req.body;
        const user = await getEmailUser(email);
        const { success, error, data } = loginValidator(user, { email: true, password: true });

        if (!success) {
            return res.status(400).json({
                message: "erro na validação dos dados",
                error: error.flatten().fieldErrors
            });
        }

        if (!data.email) {
            return res.status(404).json({
                message: "email de usuário não encontrado",
                error: error
            })
        }

        const validPassword = await bycrypt.compare(password, data.password);

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

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
        await createToken(user.id, token); // cria a sessão do usuário

        return res.status(200).json({
            message: "usuário logado com sucesso",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                birthdate: user.birthdate,
                telNumber: user.telNumber
            }
        });
        

    } catch (error) {
        next(error);
    }
}