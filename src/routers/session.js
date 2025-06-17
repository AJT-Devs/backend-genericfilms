import express from 'express';
import getSession from '../controllers/session/getSession.js';
import postSession from '../controllers/session/postSession.js';
import putSession from '../controllers/session/putSession.js';
import deleteSession from '../controllers/session/deleteSession.js';

const session = express.Router();

session.get('/', getSession);
session.post('/', postSession);
session.put('/', putSession);    
session.delete('/', deleteSession);

export default session;