import express from 'express';
import getUser from '../controllers/user/getUser.js';
import postUser from '../controllers/user/postUser.js';
import putUser from '../controllers/user/putUser.js';
import patchUser from '../controllers/user/patchUser.js';
import deleteUser from '../controllers/user/deleteUser.js';

const user = express.Router();

user.get('/', getUser); 
user.post('/', postUser);
user.put('/', putUser); 
user.patch('/', patchUser);
user.delete('/', deleteUser);

export default user;