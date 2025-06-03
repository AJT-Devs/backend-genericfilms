import express from 'express';
import uploadMiddleware from '../middlewares/uploadImage.js';
import { uploadImage } from '../controllers/upload/uploadImage.js';

const upload = express.Router();

upload.post('/image', uploadMiddleware.single('image'), uploadImage);

export default upload;