import express from 'express';
import signUpController from '../controllers/auth/singUpUserController.js';
import loginUserController from '../controllers/auth/loginUserController.js';

const auth = express.Router();
auth.use(express.json());

auth.get('/', (req, res) => {
    res.status(200).json({
        message: "Bem-vindo ao sistema de autenticação",
        routes: {
            signup: "/signup",
            login: "/login"
        }
    });
})
auth.post('/signup',express.json(), signUpController); // Local de cadastro
auth.post('/login', express.json(), loginUserController); // Local de login

export default auth;