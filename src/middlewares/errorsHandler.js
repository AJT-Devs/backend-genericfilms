export const errorHandler = (error, req, res, next) => {
    console.error(error)
    if(error?.type === 'entity.parse.failed' && error.message.includes('JSON')){
        return res.status(400).json({
            message: "JSON Inválido, verifique a formatação dos dados!"
        })
    }
    if(error?.code === 'P2025'){
        return res.status(404).json({
            message: "Dados não encontrados!"
        })
    }
    return res.status(500).json({
        message: "Erro inesperado, tente novamente mais tarde."
    })
}