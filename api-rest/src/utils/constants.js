const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};

const ERROR_MESSAGES = {
    REQUIRED_FIELD: 'Los campos obligatorios no fueron proporcionados',
    NOT_FOUND: 'Recurso no encontrado',
    DUPLICATE_ENTRY: 'El recurso ya existe',
    INVALID_DATA: 'Datos inválidos',
    INTERNAL_ERROR: 'Error interno del servidor'
};

module.exports = {
    HTTP_STATUS,
    ERROR_MESSAGES
};