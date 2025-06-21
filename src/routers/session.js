import express from 'express';
import getSession from '../controllers/session/getSession.js';
import postSession from '../controllers/session/postSession.js';
import putSession from '../controllers/session/putSession.js';
import deleteSession from '../controllers/session/deleteSession.js';
import getListSession from '../controllers/session/getListSession.js';
import verifyAdminToken from '../middlewares/verifyAdminToken.js';

const session = express.Router();

const app = express();
app.use(express.json());

session.get('/list/:id', getListSession);
session.get('/:id',  getSession);
session.delete('/:id', verifyAdminToken, deleteSession);
session.put('/:id', verifyAdminToken, express.json(), putSession);    
session.post('/', verifyAdminToken, express.json(), postSession);

export default session;