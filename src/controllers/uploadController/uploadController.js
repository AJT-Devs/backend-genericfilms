import path from 'path';

export async function uploadImage(req, res) {

    if(!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    } else {
        const filePath = `/uploads/${req.file.filename}`; 
        res.status(200).json({ 
            message: 'File uploaded successfully', 
            filePath: filePath 
        });
    };


}