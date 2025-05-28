import express from 'express';
import upload from '../middlewares/uploadImage.js';
import { uploadImage } from '../controllers/uploadController/uploadController.js';

const uploadRouter = express.Router();

uploadRouter.post('/image', upload.single('image'), uploadImage);

export default uploadRouter;