import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import uploadRoutes from './routers/uploadRoutes.js';
import movie from './routers/movie.js';
import user from './routers/user.js';
import cinema from './routers/cinema.js';
import session from './routers/session.js';
import admin from './routers/admin.js';
import reserve from './routers/reserve.js';
import ticket from './routers/ticket.js';

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middlewares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));


//Routes
app.use('/movie', movie);
app.use('/user', user);
app.use('/cinema', cinema);
app.use('/session', session);
app.use('/admin', admin);
app.use('/reserve', reserve);
app.use('/upload', uploadRoutes);
app.use('/ticket', ticket);

// funções
app.get('/', (req, res) => {
    return res.send("hello world");
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});