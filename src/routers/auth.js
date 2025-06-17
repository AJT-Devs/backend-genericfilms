import express from 'express';
import signUpController from '../controllers/auth/user/singUpUserController.js';
import loginUserController from '../controllers/auth/user/loginUserController.js';
import logoutUserController from '../controllers/auth/user/logoutUserController.js'; 
import {authMiddleware} from '../middlewares/verifyUserToken.js';

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
auth.post('/logout', authMiddleware, express.json(), logoutUserController); // Local de logout

export default auth;