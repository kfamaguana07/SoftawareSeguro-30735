const db = require('../config/database');

class ClienteRepository {
    async findAll() {
        const [rows] = await db.query('SELECT * FROM clientes');
        return rows;
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM clientes WHERE email = ?', [email]);
        return rows[0] || null;
    }

    async create(clienteData) {
        const { nombre, email, telefono } = clienteData;
        const [result] = await db.query(
            'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)',
            [nombre, email, telefono || null]
        );
        return { id: result.insertId, ...clienteData };
    }

    async update(id, clienteData) {
        const { nombre, email, telefono } = clienteData;
        const [result] = await db.query(
            'UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
            [nombre, email, telefono || null, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = new ClienteRepository();