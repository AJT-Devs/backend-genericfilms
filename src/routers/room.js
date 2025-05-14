import express from 'express';
import getRoom from '../controllers/room/getRoom.js';
import getListRoom  from '../controllers/room/getListRoom.js';
import postRoom from '../controllers/room/postRoom.js';
import putRoom from '../controllers/room/putRoom.js';
import deleteRoom from '../controllers/room/deleteRoom.js';

const Room = express.Router();


Room.get('/:id', getRoom);
Room.get('/list', getListRoom);
Room.post('/', postRoom);
Room.put('/:id', putRoom);
Room.delete('/:id', deleteRoom);

export default Room;