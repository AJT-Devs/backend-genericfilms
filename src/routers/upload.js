import express from 'express';
import upload from '../middlewares/uploadImage.js';
import { uploadImage } from '../controllers/upload/postUpload.js';

const upload = express.Router();

upload.post('/image', upload.single('image'), uploadImage);

export default upload;