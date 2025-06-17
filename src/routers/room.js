import express from 'express';
import getRoom from '../controllers/room/getRoom.js';
import getListRoom  from '../controllers/room/getListRoom.js';
import postRoom from '../controllers/room/postRoom.js';
import putRoom from '../controllers/room/putRoom.js';
import deleteRoom from '../controllers/room/deleteRoom.js';
import verifyAdminToken from '../middlewares/verifyAdminToken.js';

const room = express.Router();
room.use(express.json());



room.get('/list/:idCinema', getListRoom);
room.get('/:id', getRoom);
room.post('/', verifyAdminToken, postRoom);
room.put('/:id', verifyAdminToken, putRoom);
room.delete('/:id', verifyAdminToken, deleteRoom);

export default room;