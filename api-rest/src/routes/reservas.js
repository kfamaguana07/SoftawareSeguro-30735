const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT r.*, h.nombre as hotel_nombre, c.nombre as cliente_nombre 
            FROM reservas r 
            JOIN hoteles h ON r.hotel_id = h.id 
            JOIN clientes c ON r.cliente_id = c.id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT r.*, h.nombre as hotel_nombre, c.nombre as cliente_nombre 
            FROM reservas r 
            JOIN hoteles h ON r.hotel_id = h.id 
            JOIN clientes c ON r.cliente_id = c.id
            WHERE r.id = ?
        `, [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id } = req.body;
    if (!fecha_entrada || !fecha_salida || !hotel_id || !cliente_id) {
        return res.status(400).json({ error: 'Los campos fecha_entrada, fecha_salida, hotel_id y cliente_id son obligatorios' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO reservas (fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id) VALUES (?, ?, ?, ?, ?)',
            [fecha_entrada, fecha_salida, num_huespedes || 1, hotel_id, cliente_id]
        );
        res.status(201).json({ 
            id: result.insertId, 
            fecha_entrada, 
            fecha_salida, 
            num_huespedes: num_huespedes || 1, 
            hotel_id, 
            cliente_id 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id } = req.body;
    if (!fecha_entrada || !fecha_salida || !hotel_id || !cliente_id) {
        return res.status(400).json({ error: 'Los campos fecha_entrada, fecha_salida, hotel_id y cliente_id son obligatorios' });
    }
    try {
        const [result] = await pool.query(
            'UPDATE reservas SET fecha_entrada = ?, fecha_salida = ?, num_huespedes = ?, hotel_id = ?, cliente_id = ? WHERE id = ?',
            [fecha_entrada, fecha_salida, num_huespedes || 1, hotel_id, cliente_id, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.json({ 
            id: req.params.id, 
            fecha_entrada, 
            fecha_salida, 
            num_huespedes: num_huespedes || 1, 
            hotel_id, 
            cliente_id 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
