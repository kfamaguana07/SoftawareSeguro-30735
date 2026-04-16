const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const clienteRoutes = require('./routes/cliente.routes');
const hotelRoutes = require('./routes/hotel.routes');
const reservaRoutes = require('./routes/reserva.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Agrega esto en src/app.js para exponer el JSON
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api/clientes', clienteRoutes);
app.use('/api/hoteles', hotelRoutes);
app.use('/api/reservas', reservaRoutes);

app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API REST Hotel Reservas',
        endpoints: [
            'GET /api/hoteles',
            'GET /api/hoteles/:id',
            'POST /api/hoteles',
            'PUT /api/hoteles/:id',
            'DELETE /api/hoteles/:id',
            'GET /api/clientes',
            'GET /api/clientes/:id',
            'POST /api/clientes',
            'PUT /api/clientes/:id',
            'DELETE /api/clientes/:id',
            'GET /api/reservas',
            'GET /api/reservas/:id',
            'POST /api/reservas',
            'PUT /api/reservas/:id',
            'DELETE /api/reservas/:id',
            'Documentación Swagger: /api-docs'
        ]
    });
});

app.use(errorMiddleware);

module.exports = app;