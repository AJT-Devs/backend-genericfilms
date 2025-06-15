import express from 'express';
import getUser from '../controllers/user/getUser.js';
import getAllUser from '../controllers/user/getAllUser.js';
import putUser from '../controllers/user/putUser.js';
import deleteUser from '../controllers/user/deleteUser.js';

const user = express.Router();
user.use(express.json());

user.get('/', getUser, express.json()); // somete usar para o adimin ou para usario logado, não para login
user.get('/all', getAllUser);
user.put('/', putUser, express.json()); 
user.delete('/', deleteUser, express.json());

export default user;