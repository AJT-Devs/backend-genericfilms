import express from 'express';
import uploadMiddleware from '../middlewares/uploadImage.js';
import { uploadImage } from '../controllers/upload/uploadImage.js';

const upload = express.Router();

upload.post('/image', uploadMiddleware.array('image', 2), uploadImage);

export default upload;