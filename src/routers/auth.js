import express from 'express';
import signUpController from '../controllers/auth/singUpUserController.js';

const auth = express.Router();
auth.use(express.json());

auth.post('/signup',express.json(), signUpController); // Endpoint for user signup

export default auth;