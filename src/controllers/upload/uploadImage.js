export async function uploadImage(req, res) {
    try {
        // Verifica se os arquivos foram enviados
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
        }

        // Caminhos dos arquivos salvos
        const filePaths = req.files.map(file => `/uploads/${file.filename}`);
        res.status(200).json({
            message: 'Arquivos enviados com sucesso.',
            filePaths: filePaths
        });
    } catch (error) {
        // Captura erros inesperados
        res.status(500).json({
            error: 'Ocorreu um erro ao processar o upload.',
            details: error.message
        });
    }
}