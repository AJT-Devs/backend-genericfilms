import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    // Define o destino onde os arquivos serão salvos
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); 
    },
    // Define o nome do arquivo salvo
    filename: (req, file, cb) => { 
        const nomeBruto = req.body.name || 'user'; 
        const username = nomeBruto.replace(/\s+/g, '-').toLowerCase(); // Remove espaços e converte para minúsculas
        const time = Date.now();
        const ext = path.extname(file.originalname); // Obtém a extensão do arquivo
        cb(null, `${username}-${time}${ext}`); // Nome final do arquivo
    }
});

const fileFilter = (req, file, cb) => {
    // Verifica se o arquivo é uma imagem
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Arquivo não suportado. Apenas arquivos de imagem (JPEG, JPG, PNG, GIF) e PDF são permitidos.'), false);
    }
}

const upload = multer({ 
    storage, 
    fileFilter, 
    limits: { fileSize: 1 * 1024 * 1024 } // Limite de 5MB
}); 

export default upload;