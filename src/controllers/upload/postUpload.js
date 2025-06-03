import path from 'path';

export async function uploadImage(req, res) {

    if (!req.file) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(400).json({ error: 'No file uploaded' });
        }
    } else {
        const filePath = `/uploads/${req.file.filename}`;
        res.status(200).json({
            message: 'File uploaded successfully',
            filePath: filePath
        });
    };


}