const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Reservas API',
            version: '1.0.0',
            description: 'API REST para Gestión de Reservas de Hotel',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            schemas: {
                Hotel: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID del hotel' },
                        nombre: { type: 'string', description: 'Nombre del hotel' },
                        direccion: { type: 'string', description: 'Dirección del hotel' },
                        estrellas: { type: 'integer', description: 'Cantidad de estrellas (1-5)' },
                        telefono: { type: 'string', description: 'Teléfono del hotel' },
                    },
                },
                HotelInput: {
                    type: 'object',
                    required: ['nombre', 'direccion', 'estrellas', 'telefono'],
                    properties: {
                        nombre: { type: 'string', description: 'Nombre del hotel' },
                        direccion: { type: 'string', description: 'Dirección del hotel' },
                        estrellas: { type: 'integer', description: 'Cantidad de estrellas (1-5)' },
                        telefono: { type: 'string', description: 'Teléfono del hotel' },
                    },
                },
                Cliente: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID del cliente' },
                        nombre: { type: 'string', description: 'Nombre del cliente' },
                        email: { type: 'string', description: 'Email del cliente' },
                        telefono: { type: 'string', description: 'Teléfono del cliente' },
                    },
                },
                ClienteInput: {
                    type: 'object',
                    required: ['nombre', 'email', 'telefono'],
                    properties: {
                        nombre: { type: 'string', description: 'Nombre del cliente' },
                        email: { type: 'string', description: 'Email del cliente' },
                        telefono: { type: 'string', description: 'Teléfono del cliente' },
                    },
                },
                Reserva: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID de la reserva' },
                        fecha_entrada: { type: 'string', format: 'date', description: 'Fecha de entrada' },
                        fecha_salida: { type: 'string', format: 'date', description: 'Fecha de salida' },
                        num_huespedes: { type: 'integer', description: 'Número de huéspedes' },
                        hotel_id: { type: 'integer', description: 'ID del hotel' },
                        cliente_id: { type: 'integer', description: 'ID del cliente' },
                    },
                },
                ReservaInput: {
                    type: 'object',
                    required: ['fecha_entrada', 'fecha_salida', 'num_huespedes', 'hotel_id', 'cliente_id'],
                    properties: {
                        fecha_entrada: { type: 'string', format: 'date', description: 'Fecha de entrada' },
                        fecha_salida: { type: 'string', format: 'date', description: 'Fecha de salida' },
                        num_huespedes: { type: 'integer', description: 'Número de huéspedes' },
                        hotel_id: { type: 'integer', description: 'ID del hotel' },
                        cliente_id: { type: 'integer', description: 'ID del cliente' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
