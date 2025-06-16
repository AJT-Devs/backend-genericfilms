import express from 'express';
import getRoom from '../controllers/room/getRoom.js';
import getListRoom  from '../controllers/room/getListRoom.js';
import postRoom from '../controllers/room/postRoom.js';
import putRoom from '../controllers/room/putRoom.js';
import deleteRoom from '../controllers/room/deleteRoom.js';

const room = express.Router();
room.use(express.json());



room.get('/list/:idCinema', getListRoom);
room.get('/:id', getRoom);
room.post('/', postRoom);
room.put('/:id', putRoom);
room.delete('/:id', deleteRoom);

export default room;