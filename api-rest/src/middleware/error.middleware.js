const ApiResponse = require('../utils/ApiResponse');

const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);

    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json(
            ApiResponse.error('El recurso ya existe', 409)
        );
    }

    if (err.message === 'Recurso no encontrado') {
        return res.status(404).json(
            ApiResponse.notFound(err.message)
        );
    }

    if (err.message === 'Los campos obligatorios no fueron proporcionados') {
        return res.status(400).json(
            ApiResponse.badRequest(err.message)
        );
    }

    res.status(500).json(
        ApiResponse.error('Error interno del servidor', 500)
    );
};

module.exports = errorMiddleware;