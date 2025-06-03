import express from 'express';
import getUser from '../controllers/user/getUser.js';
import getAllUser from '../controllers/user/getAllUser.js';
import signUpUserController from '../controllers/auth/singUpUserController.js';
import putUser from '../controllers/user/putUser.js';
import patchUser from '../controllers/user/patchUser.js';
import deleteUser from '../controllers/user/deleteUser.js';

const user = express.Router();

user.get('/', getUser); 
user.get('/all', getAllUser); // Assuming you want to get all users with a different endpoint
user.post('/', signUpUserController);
user.put('/', putUser); 
user.patch('/', patchUser);
user.delete('/', deleteUser);

export default user;