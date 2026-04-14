const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM hoteles');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM hoteles WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Hotel no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { nombre, direccion, estrellas, telefono } = req.body;
    if (!nombre || !direccion) {
        return res.status(400).json({ error: 'Los campos nombre y direccion son obligatorios' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO hoteles (nombre, direccion, estrellas, telefono) VALUES (?, ?, ?, ?)',
            [nombre, direccion, estrellas || null, telefono || null]
        );
        res.status(201).json({ id: result.insertId, nombre, direccion, estrellas, telefono });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { nombre, direccion, estrellas, telefono } = req.body;
    if (!nombre || !direccion) {
        return res.status(400).json({ error: 'Los campos nombre y direccion son obligatorios' });
    }
    try {
        const [result] = await pool.query(
            'UPDATE hoteles SET nombre = ?, direccion = ?, estrellas = ?, telefono = ? WHERE id = ?',
            [nombre, direccion, estrellas || null, telefono || null, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Hotel no encontrado' });
        }
        res.json({ id: req.params.id, nombre, direccion, estrellas, telefono });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
