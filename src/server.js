import express from 'express'
import movie from './routers/movie.js'
import user from './routers/user.js'
import cinema from './routers/cinema.js'

const app = express();
const port = 3000;

app.use('/movie', movie);
app.use('/user', user);
app.use('/cinema', cinema);

app.get('/', (req, res)=>{
    return res.send("hello world");
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })