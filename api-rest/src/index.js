const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/hoteles', require('./routes/hoteles'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/reservas', require('./routes/reservas'));

app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API REST Hotel Reservas',
        endpoints: [
            'GET /api/hoteles',
            'GET /api/hoteles/:id',
            'POST /api/hoteles',
            'PUT /api/hoteles/:id',
            'GET /api/clientes',
            'GET /api/clientes/:id',
            'POST /api/clientes',
            'PUT /api/clientes/:id',
            'GET /api/reservas',
            'GET /api/reservas/:id',
            'POST /api/reservas',
            'PUT /api/reservas/:id'
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
