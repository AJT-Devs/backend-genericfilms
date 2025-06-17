import express from 'express';
import getSession from '../controllers/session/getSession.js';
import postSession from '../controllers/session/postSession.js';
import putSession from '../controllers/session/putSession.js';
import patchSession from '../controllers/session/patchSession.js';
import deleteSession from '../controllers/session/deleteSession.js';
import verifyAdminToken from '../middlewares/verifyAdminToken.js';

const session = express.Router();

session.get('/', getSession);
session.post('/', verifyAdminToken, postSession);
session.put('/', verifyAdminToken, putSession);  
session.patch('/', verifyAdminToken, patchSession);    
session.delete('/', verifyAdminToken, deleteSession);

export default session;