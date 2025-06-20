import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import movie from './routers/movie.js';
import user from './routers/user.js';
import cinema from './routers/cinema.js';
import room from './routers/room.js';
import session from './routers/session.js';
import admin from './routers/admin.js';
import reserve from './routers/reserve.js';
import ticket from './routers/ticket.js';
import auth from './routers/auth.js';
import {errorHandler} from './middlewares/errorsHandler.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import notFound from './controllers/notFound.js';
import welcome from './controllers/welcome.js';
import { logger } from './middlewares/logger.js';

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
// url: do caminho do arquivo
// exemplo: http://localhost:3000/uploads/user-1748817777115.jpg
// exemplo: http://localhost:3000/uploads/angelo-1748818165294.jpg
// para enviar upload da img: http://localhost:3000/upload/image, file, name: 'userName'

//middlewares
app.use(cookieParser());
app.use(cors({
  origin: 'http://127.0.0.1:5501', // ou 'http://localhost:5500' dependendo do Live Server
  credentials: true
}));
app.use(logger);

//Routes
app.use('/movie', movie);
app.use('/user', user);
app.use('/cinema', cinema);
app.use('/room', room);
app.use('/session', session);
app.use('/admin', admin);
app.use('/reserve', reserve);
app.use('/ticket', ticket);
app.use('/auth', auth);


app.get('/', welcome);
// app.use('*', notFound); não sei o porquê, mas crasha o server se habilitar

app.use(errorHandler);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});