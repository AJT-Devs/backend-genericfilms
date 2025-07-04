import express from 'express';
import getUser from '../controllers/user/getUser.js';
import getAllUser from '../controllers/user/getAllUser.js';
import putUser from '../controllers/user/putUser.js';
import deleteUser from '../controllers/user/deleteUser.js';
import {authMiddleware} from '../middlewares/verifyUserToken.js';
import verifyAdminToken from '../middlewares/verifyAdminToken.js';

const user = express.Router();
user.use(express.json());

user.get('/all', verifyAdminToken, getAllUser);
user.get('/:id', getUser, express.json());
user.put('/', authMiddleware, putUser, express.json()); 
user.delete('/', authMiddleware, deleteUser, express.json());

export default user;