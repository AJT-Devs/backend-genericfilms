import express from 'express';
import getSession from '../controllers/session/getSession.js';
import postSession from '../controllers/session/postSession.js';
import putSession from '../controllers/session/putSession.js';
import deleteSession from '../controllers/session/deleteSession.js';
import getListSession from '../controllers/session/getListSession.js';

const session = express.Router();

const app = express();
app.use(express.json());

session.get('/list', getListSession);
session.get('/:id', getSession);
session.delete('/:id', deleteSession);
session.put('/:id', express.json(), putSession);    
session.post('/', express.json(), postSession);

export default session;