import express from 'express'
import movie from './routers/movie.js'
import user from './routers/user.js'
import cinema from './routers/cinema.js'
import session from './routers/session.js'
import admin from './routers/admin.js'
import reserve from './routers/reserve.js'

const app = express();
const port = 3000;

app.use('/movie', movie);
app.use('/user', user);
app.use('/cinema', cinema);
app.use ('/session', session);
app.use('/admin', admin);
app.use('/reserve', reserve);

app.get('/', (req, res)=>{
    return res.send("hello world");
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })