const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { nombre, email, telefono } = req.body;
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Los campos nombre y email son obligatorios' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)',
            [nombre, email, telefono || null]
        );
        res.status(201).json({ id: result.insertId, nombre, email, telefono });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'El email ya existe' });
        }
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { nombre, email, telefono } = req.body;
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Los campos nombre y email son obligatorios' });
    }
    try {
        const [result] = await pool.query(
            'UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
            [nombre, email, telefono || null, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ id: req.params.id, nombre, email, telefono });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'El email ya existe' });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
