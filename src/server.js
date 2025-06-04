import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import upload from './routers/upload.js';
import movie from './routers/movie.js';
import user from './routers/user.js';
import cinema from './routers/cinema.js';
import session from './routers/session.js';
import admin from './routers/admin.js';
import reserve from './routers/reserve.js';
import ticket from './routers/ticket.js';
import auth from './routers/auth.js';

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middlewares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
// url: do caminho do arquivo
// exemplo: http://localhost:3000/uploads/user-1748817777115.jpg
// exemplo: http://localhost:3000/uploads/angelo-1748818165294.jpg
// para enviar upload da img: http://localhost:3000/upload/image, file, name: 'userName'


//Routes
app.use('/movie', movie);
app.use('/user', user);
app.use('/cinema', cinema);
app.use('/session', session);
app.use('/admin', admin);
app.use('/reserve', reserve);
app.use('/upload', upload);
app.use('/ticket', ticket);
app.use('/auth', auth);

// funções
app.get('/', (req, res) => {
    return res.send("hello world");
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});